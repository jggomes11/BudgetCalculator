import React, { useState } from "react";
import { Chart } from "react-google-charts";


import api from "../../services/api";
import "./styles.css";

export default function Register() {

    const types = ["MATERIAIS", "PESSOAL", "EQUIPAMENTOS"]
    const [items, setItems] = useState([{
        title: 'Item1',
        type: 'MATERIAIS',
        amount: 1,
        value: 100,
    },{
        title: 'Item2',
        type: 'PESSOAL',
        amount: 1,
        value: 50,
    },
    {
        title: 'Item3',
        type: 'PESSOAL',
        amount: 1,
        value: 25,
    },
    {
        title: 'Item4',
        type: 'EQUIPAMENTOS',
        amount: 1,
        value: 50,
    },
    {
        title: 'Item5',
        type: 'EQUIPAMENTOS',
        amount: 1,
        value: 10,
    }])
    const [plot, setPlot] = useState([])


    function handleInputChange (index, event, field) {
        const { value } = event.target;

        const modifiedItems = [...items];
        modifiedItems[index][field] = value;
        console.log(modifiedItems)
        setItems(modifiedItems)
    };

    function handleAddField () {
        const newItem = [...items, { }];
        setItems(newItem)
    };

    function handleDeleteField (index) {
        const modifiedItems = [...items];
        modifiedItems.splice(index, 1);
        setItems(modifiedItems)
    };

    async function handleCalculate (e) {
        console.log("handleCalculate")
        e.preventDefault();
        const data = {
            items
        };

        const response = await api.post("/", data).catch(() => {
            alert("Erro no cálculo, tente novamente.");
        });
        console.log(response.data)
        setPlot(response.data.budget)
    }

    return (
        <div className="page-container">
            <div className="content">
                <section>
                    <h1>Calculadora de Orçamento</h1>
                    <p>
                        Adicione items e calcule seu orçamento
                    </p>
                </section>

                <form onSubmit={handleCalculate}>
                    {items.map((item, index) => (
                        <div  className="items" key={index}>
                            <div className="item">
                                <input
                                    placeholder="Título"
                                    value={item.title}
                                    onChange={e => handleInputChange(index, e, 'title')}
                                    style={{maxWidth: '30vh'}}
                                />
                                <select
                                    placeholder="Categoria"
                                    value={item.type}
                                    onChange={(e) =>  handleInputChange(index, e, 'type')}
                                >
                                    <option value="">
                                        Selecione uma categoria
                                    </option>
                                    {types.map((type, i) => (
                                        <option key={i} value={type}>{type}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="Quantidade"
                                    type="number"
                                    min="1" 
                                    step="1"
                                    value={item.amount}
                                    onChange={e => handleInputChange(index, e, 'amount')}
                                />
                                <input
                                    placeholder="Valor"
                                    type="number"
                                    value={item.value}
                                    onChange={e => handleInputChange(index, e, 'value')}
                                />
                                <button type="button" className="button-delete" onClick={() => handleDeleteField(index)}> - </button>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="button-add" onClick={handleAddField}> + </button>
                    <button className="button-calc">Calcular</button>
                    <section style={{marginTop: "32px"}}>
                        <h1>Custo do Projeto</h1>
                    </section>
                    {plot.length > 1  ? 
                         <Chart
                            chartType="PieChart"
                            width="100%"
                            height="400px"
                            data={[["Categoria", "Orçamento"], ...plot]}
                            options={{
                                backgroundColor: 'transparent',
                                pieHole: 0.4,
                                is3D: false,
                            }}
                            
                        /> :
                        <>
                            <p> Sem dados para calcular </p>
                            <p> Adicione dados e clique no botão </p>
                        </>

                    }

                </form>               
            </div>
        </div>
    );
}
