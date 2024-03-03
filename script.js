let form = document.querySelector("form")
let nome = document.querySelector("#nome")
let data = document.querySelector("#data")
let pessoa = JSON.parse(localStorage.getItem("pessoaAniversario")) || []
let index



form.addEventListener("submit",()=>{

    {
        let newData = data.value.replace(/[0-9]{4}/, data.value.match(/[0-9]{2}$/));
        newData = newData.replace(/[0-9]{2}$/, data.value.match(/[0-9]{4}/))
        pessoa.push(
            {
                nome: nome.value,
                data: newData
            }
        )
        localStorage.setItem("pessoaAniversario", JSON.stringify(pessoa))
        console.log(pessoa)
    }
    location.reload()
})
function editar(index,obj){
    nome !="" && data.value!=""? form.submit():
    nome.value = obj[index].nome
    data.value = obj[index].data
    document.querySelector("#"+obj[index].nome.replace(/\W/g,"_")).remove()
   obj.splice(index,1)

}
function apagar(index,obj){
    document.querySelector("#"+obj[index].nome.replace(/\W/g,"_")).remove()
    obj.splice(index,1)
    location.reload()
    localStorage.setItem("pessoaAniversario", JSON.stringify(obj))
}
document.addEventListener("DOMContentLoaded",()=>{
    console.log("carregou")
    for (index in pessoa) {
        let linha = document.createElement("tr")
        linha.id = pessoa[index].nome.replace(/\W/g,"_")
      let linhaNome = document.createElement("th")
        linhaNome.innerText=pessoa[index].nome
        linhaNome.scope = "col"
        let linhaData = document.createElement("td")
        linhaData.innerText = pessoa[index].data
       let funcoesLinha = document.createElement("td")
        funcoesLinha.innerHTML = `<button id="apagar" onclick="apagar(${index},pessoa)"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"/></svg></button>
                                   <button id="editar" onclick="editar(${index},pessoa)"><svg xmlns="http://www.w3.org/2000/svg" height="24"viewBox="0 -960 960 960" width="24"><path d="M146-100q-19.5 0-32.75-13.25T100-146v-85.5q0-18.5 7.25-36T127.5-298L669-840q8.5-9.5 21.5-14.75T717-860q12.5 0 25 5.25T766.5-841l75.5 72.5q9 11.5 14 24.5t5 26.5q0 14-5.25 26.75T842-668.5l-542 541q-14 13-31 20.25T233.5-100H146Zm576.5-581 38-37.5-40-41-39.5 38 41.5 40.5Z"/></svg></button>
`
        linha.append(linhaNome,linhaData,funcoesLinha)
        document.querySelector("tbody").append(linha)
    }

})