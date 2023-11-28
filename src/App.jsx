import { useState } from "react";

function App() {
  const [isActive, setIsActive] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataForm, setDataForm] = useState({
    name: "",
    metrosAltura: 0,
    metrosAnchura: 0,
    precio: 0,
  });
  const [resultadoTotal, setResultadoTotal] = useState(0);

  const handleChange = (e) => {
    const { value, name } = e.target;
    let parsedValue = value;

    if (name !== "name") {
      const regex = /^[0-9]+(\.[0-9]*)?$/;
      if (parsedValue[0] == 0 && parsedValue[parsedValue.length - 1] !== ".")
        parsedValue = parsedValue.replace(/^(0+)/g, "");
      if (value === "" || isNaN(parsedValue)) parsedValue = 0;
      if (!regex.test(parsedValue)) parsedValue = parseFloat(parsedValue);
    }
    setDataForm((dataForm) => ({
      ...dataForm,
      [name]: parsedValue,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { ...newState } = dataForm;
    const metrosAltura = dataForm.metrosAltura > 0 ? dataForm.metrosAltura : 1;
    const metrosAnchura = dataForm.metrosAnchura > 0 ? dataForm.metrosAnchura : 1;
    const resultado = metrosAltura * metrosAnchura * dataForm.precio;

    setResultadoTotal(resultadoTotal + resultado);
    newState.resultado = resultado.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    newState.precio = parseInt(dataForm.precio).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    setDataList([...dataList, newState]);
  };

  const deleteItem = (index) => {
    const itemSelected = dataList.find((value, i) => i === index);
    const resultado = parseFloat(itemSelected.resultado.replace(/[$,]/g, ""));
    setResultadoTotal(resultadoTotal - resultado);
    setDataList(dataList.filter((value, i) => i !== index));
  };
  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col justify-center items-center gap-y-2 mt-4 font-thin"
      >
        <label className="font-medium text-lg">Nombre</label>
        <input
          onChange={(e) => handleChange(e)}
          value={dataForm.name}
          type="text"
          name="name"
          className="border-2 rounded-lg"
        />
        <label className="font-medium text-lg">M² Alto:</label>
        <input
          onChange={(e) => handleChange(e)}
          value={dataForm.metrosAltura}
          type="number"
          name="metrosAltura"
          className="border-2 rounded-lg"
        />
        <label className="font-medium text-lg">M² Largo:</label>
        <input
          onChange={(e) => handleChange(e)}
          value={dataForm.metrosAnchura}
          type="number"
          name="metrosAnchura"
          className="border-2 rounded-lg"
        />
        <label className="font-medium text-lg">Precio por metro</label>
        <input
          onChange={(e) => handleChange(e)}
          value={dataForm.precio}
          type="number"
          name="precio"
          className="border-2 rounded-lg"
        />
        <button
          className="py-1 px-2 bg-green-600 hover:bg-green-700 duration-200 text-white"
          onClick={(e) => handleClick(e)}
        >
          Calcular
        </button>
        <button
          className="py-1 px-2 bg-indigo-500 hover:bg-indigo-600 duration-200 text-white"
          onClick={(e) => setIsActive(!isActive)}
        >
          Mostrar Resultados
        </button>
      </form>
      <div
        className={`${
          isActive ? "visible" : "hidden"
        } fixed top-0 bottom-0 left-0 right-0 bg-black/40 flex justify-center items-center`}
      >
        <button
          onClick={(e) => setIsActive(!isActive)}
          className="absolute text-white top-10 py-1 px-2 bg-red-600 hover:bg-red-700 duration-200"
        >
          Ocultar
        </button>
        <div className="overflow-auto h-3/4 relative">
          {dataList.map((value, index) => {
            const pricePerMeter = value.precio.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            return (
              <div key={index} className={`${index % 2 === 0 ? "bg-cyan-400" : "bg-indigo-400"} py-2`}>
                <ul className="pl-2">
                  <li>Nombre: {value.name}</li>
                  <li>Metros de Alto: {value.metrosAltura}m</li>
                  <li>Metros de Ancho: {value.metrosAnchura}m</li>
                  <li>Precio por Metro: {pricePerMeter} </li>
                  <li>Precio : {value.resultado}</li>
                </ul>
                <div className="flex justify-center gap-4">
                  {/* <button className="bg-yellow-400 px-2 py-0.5">Editar</button> */}
                  <button onClick={(e) => deleteItem(index)} className="bg-red-500 text-white px-2 py-0.5">
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
          <ul className="bg-green-500 text-center sticky bottom-0 p-2 text-white">
            <li>
              <span className="text-lg font-semibold">
                Presupuesto Total:{" "}
                {resultadoTotal.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
