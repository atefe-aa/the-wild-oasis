import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinsTableOprations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
      <SortBy options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regular_price-asc", label: "Sort by Price (lowest)" },
          { value: "regular_price-desc", label: "Sort by Price (highest)" },
          { value: "max_capacity-asc", label: "Sort by capacity (lowest)" },
          { value: "max_capacity-desc", label: "Sort by capacity (highest)" }, 
        ]} />
    </TableOperations>
  );
}

export default CabinsTableOprations;
