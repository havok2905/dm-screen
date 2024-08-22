import {
  CenteredContainer,
  Container,
  Spinner,
  Tag
} from '@designSystem/components';

import { Link } from 'react-router-dom';
import { MarkdownEntity } from '@core/types';

import {
  CompendiumNavbar,
  Markdown
} from '../../../../components';

export interface MarkdownEntityViewPageProps {
  backLinkLabel: string;
  backLinkPath: string;
  isLoading: boolean;
  markdownEntity: MarkdownEntity
}

export const MarkdownEntityViewPage = ({
  backLinkLabel,
  backLinkPath,
  isLoading,
  markdownEntity
}: MarkdownEntityViewPageProps) => {
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

  return (
    <>
      <CompendiumNavbar />
      <Container>
        <p>
          <Link to={backLinkPath}>
            {backLinkLabel}
          </Link>
        </p>
        <h2>
          {name}
        </h2>
        <p>
          <strong>ID:</strong> {id}
        </p>
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
        {
          image ? (
            <img alt={name} src={image}/>
          ) : null
        }
        <Markdown
          content={content}/>
      </Container>
    </>
  );
};