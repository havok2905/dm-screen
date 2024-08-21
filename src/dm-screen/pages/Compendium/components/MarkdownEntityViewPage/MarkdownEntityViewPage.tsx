import {
  CenteredContainer,
  Container,
  Spinner,
} from '@designSystem/components';

import { Link } from 'react-router-dom';
import { MarkdownEntity } from '@core/types';

import { Markdown } from '../../../../components';

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
      <Container>
        <h1>
          Compendium
        </h1>
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
        <ul>
          {
            metadata.map((item, index) => {
              return (
                <li key={index}>
                  {item.name}: {String(item.value)}
                </li>
              );
            })
          }
        </ul>
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