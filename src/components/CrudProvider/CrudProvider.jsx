import CrudContext from "../../Context/CrudContext";

export default function CrudProvider(props) {

  return (
    <CrudContext.Provider value={{}}>
      {props.children}
    </CrudContext.Provider>
  )
}