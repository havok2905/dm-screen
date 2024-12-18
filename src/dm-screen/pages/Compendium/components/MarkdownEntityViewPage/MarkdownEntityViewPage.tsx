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
  markdownEntity: MarkdownEntity;
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
    metadata,
    name
  } = markdownEntity;

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
    </>
  );
};