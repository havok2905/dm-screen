import './Tag.css';

export interface TagProps {
  keyString: string;
  value: string;
}

export const Tag = ({
  keyString,
  value
}: TagProps) => {
  return (
    <div
      className="dm-screen-design-system-tag"
      data-test-id="dm-screen-design-system-tag">
      <strong>{keyString}:</strong> {value}
    </div>
  )
};
