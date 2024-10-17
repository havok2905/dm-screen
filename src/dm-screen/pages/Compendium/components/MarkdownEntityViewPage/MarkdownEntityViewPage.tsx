import {
  Button,
  CenteredContainer,
  Container,
  Modal,
  Spinner,
  Tag
} from '@designSystem/components';
import {
  ReactNode,
  useCallback,
  useState
} from 'react';

import { Link } from 'react-router-dom';
import { MarkdownEntity } from '@core/types';

import {
  CompendiumNavbar,
  ImageForm,
  Markdown
} from '../../../../components';
import {
  useAddImage,
  useRemoveImage
} from '../../../../hooks';

export interface MarkdownEntityViewPageProps {
  backLinkLabel: string;
  backLinkPath: string;
  entityType: 'creature' | 'magic-item' | 'equipment-item' | 'spell';
  isLoading: boolean;
  markdownEntity: MarkdownEntity;
  refetch: () => void;
}

export const MarkdownEntityViewPage = ({
  backLinkLabel,
  backLinkPath,
  entityType,
  isLoading,
  markdownEntity,
  refetch
}: MarkdownEntityViewPageProps) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const onSuccess = useCallback(() => {
    refetch();
    setIsImageModalOpen(false);
  }, [
    refetch
  ]);

  const {
    isError: addImageIsError,
    mutate: addImage
  } = useAddImage(onSuccess);

  const {
    isError: removeImageIsError,
    mutate: removeImage
  } = useRemoveImage(onSuccess);

  const onRemoveImageClick = useCallback(() => {
    if (markdownEntity) {
      removeImage({
        id: markdownEntity.id,
        entityType
      });
    }
  }, [
    markdownEntity
  ]);

  if (isLoading) {
    return (
      <CenteredContainer>
        <Spinner/>
      </CenteredContainer>
    );
  }

  const {
    content,
    id,
    image,
    metadata,
    name
  } = markdownEntity;

  const getImageModal = (
    isOpen: boolean,
    onClose: () => void
  ): ReactNode => {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        portalElement={document.body}
      >
        <h2>Upload Handout</h2>
        <ImageForm
          entityId={id}
          entityType={entityType}
          updateFunction={addImage}
          uploadIsError={addImageIsError}
        />
      </Modal>
    )
  };

  return (
    <>
      <CompendiumNavbar />
      <Container>
        <p data-test-id="markdown-entity-view-page-back-to-link">
          <Link to={backLinkPath}>
            {backLinkLabel}
          </Link>
        </p>
        <h2 data-test-id="markdown-entity-view-page-name">
          {name}
        </h2>
        <p data-test-id="markdown-entity-view-page-id">
          <strong>ID:</strong> {id}
        </p>
        <fieldset>
          <Button
            buttonText="Add image"
            onClick={() => {
              setIsImageModalOpen(true);
            }}
          />
        </fieldset>
        {
          image ? (
            <fieldset>
              <Button
                buttonText="Remove image"
                onClick={onRemoveImageClick}
              />
            </fieldset>
          ) : null
        }
        {
          removeImageIsError ? (
            <p>
              There was a problem removing this image.
            </p>
          ) : null
        }
        {
          image ? (
            <img alt={name} src={image}/>
          ) : null
        }
        <div style={{ marginBottom: '20px'}}>
          {
            metadata.map((item, index) => {
              return (
                <Tag
                  key={index}
                  keyString={item.name}
                  value={String(item.value)}
                />
              );
            })
          }
        </div>
        <Markdown
          content={content}/>
      </Container>
      {getImageModal(isImageModalOpen, () => {
        setIsImageModalOpen(false);
      })}
    </>
  );
};