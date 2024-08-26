import {
  Button,
  Container,
  LoadingBar
} from '@designSystem/components';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io';

import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

import { CompendiumNavbar } from '../../../components';
import { useImportDnd5eApi } from '../../../hooks';

type LoadingState = 'stale' | 'loading' | 'loaded';

export const ImportsPage = () => {
  const socketRef = useRef<Socket | null>(null);

  const [creatureState, setCreatureState] = useState<LoadingState>('stale');
  const [equipmentItemState, setEquipmentItemState] = useState<LoadingState>('stale');
  const [magicItemState, setMagicItemState] = useState<LoadingState>('stale');
  const [spellState, setSpellState] = useState<LoadingState>('stale');

  const onSuccess = useCallback(() => {
    setCreatureState('loaded');
    setEquipmentItemState('loaded');
    setMagicItemState('loaded');
    setSpellState('loaded');
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      // @ts-expect-error socket.io type setup isn't the most well documented and needs to be solved later. 
      socketRef.current = io('http://localhost:3000');
    }

    const ws = socketRef.current;

    ws?.on('importing:creatures-completed', () => {
      setCreatureState('loaded');
    });

    ws?.on('importing:creatures-initiated', () => {
      setCreatureState('loading');
    });

    ws?.on('importing:equipment-items-completed', () => {
      setEquipmentItemState('loaded');
    });

    ws?.on('importing:equipment-items-initiated', () => {
      setEquipmentItemState('loading');
    });

    ws?.on('importing:magic-items-completed', () => {
      setMagicItemState('loaded');
    });

    ws?.on('importing:magic-items-initiated', () => {
      setMagicItemState('loading');
    });

    ws?.on('importing:spells-completed', () => {
      setSpellState('loaded');
    });

    ws?.on('importing:spells-initiated', () => {
      setSpellState('loading');
    });
  }, [
  ]);

  const {
    mutate: importDnd5eApi,
  } = useImportDnd5eApi(onSuccess);

  const getLoadingLine = (
    key: string,
    isLineLoading: boolean,
    isLineLoaded: boolean
  ) => {
    return (
      <p>
        <strong>{key}:</strong>
        {' '}
        <LoadingBar
          isLoading={isLineLoading}
          isSuccess={isLineLoaded}/>
      </p>
    );
  };

  const isLoading = 
    creatureState === 'loading' ||
    equipmentItemState === 'loading' ||
    magicItemState === 'loading' ||
    spellState === 'loading';

  return (
    <>
      <CompendiumNavbar/>
      <Container>
        <h2>Imports</h2>
        <h3>5e APi</h3>
        <p>
          <strong>Source:</strong>
          {' '}
          <a href="https://5e-bits.github.io/docs/">
            https://5e-bits.github.io/docs/
          </a>
        </p>
        <div style={{ marginBottom: '20px' }}>
          <Button
            buttonText="Import all"
            onClick={() => {
              importDnd5eApi();
            }}
          />
        </div>
        {
          isLoading ? (
            <p>
              This process may take several minutes to complete. Allow the process
              to run. If you leave this page, the import may still be running in
              the background.
            </p>
          ) : null
        }
        {
          getLoadingLine(
            'Creatures',
            creatureState === 'loading',
            creatureState === 'loaded'
          )
        }
                {
          getLoadingLine(
            'Equipment Items',
            equipmentItemState === 'loading',
            equipmentItemState === 'loaded'
          )
        }
                {
          getLoadingLine(
            'Magic Items',
            magicItemState === 'loading',
            magicItemState === 'loaded'
          )
        }
                {
          getLoadingLine(
            'Spells',
            spellState === 'loading',
            spellState === 'loaded'
          )
        }
      </Container>
    </>
  );
};

