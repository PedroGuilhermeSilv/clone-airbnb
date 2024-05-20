import PropertyListItem from "./PropertyListItem";
const PropertyList = () => {
  return (
    <>
      {Array.from({ length: 20 }).map((item, i) => (
        <PropertyListItem key={i} />
      ))}
    </>
  );
};

export default PropertyList;
