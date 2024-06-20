const Avatar = ({
  style,
  children,
}: {
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  return (
    <div
      className='d-flex align-center c-white fw-600'
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: '#1AB84F',
        placeContent: 'center',
        ...(style || {}),
      }}
    >
      {children}
    </div>
  );
};

export default Avatar;
