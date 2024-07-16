const http=require('http');
const fs=require('fs')
const url=require('url')

const html=fs.readFileSync("./template/index.html","utf-8")

let productListHtml=fs.readFileSync("./template/product-list.html","utf-8")

let productdetailHtml=fs.readFileSync("./template/product-details.html","utf-8")

let products=JSON.parse(fs.readFileSync("./Data/products.json","utf-8"))

// let productHtmlArray=products.map((prod)=>{
//   // let {productImage,name,modeName,modelNumber,size,camera,price,color}=prod
//   let output=productListHtml.replace('{{%IMAGE%}}',prod.productImage)
//   output=output.replace('{{%NAME%}}',prod.name)
//   output=output.replace('{{%MODELNAME%}}',prod.modeName)
//   output=output.replace('{{%MODELNO%}}',prod.modelNumber)
//   output=output.replace('{{%SIZE%}}',prod.size)
//   output=output.replace('{{%CAMERA%}}',prod.camera)
//   output=output.replace('{{%PRICE%}}',prod.price)
//   output=output.replace('{{%COLOR%}}',prod.color)
//   output=output.replace('{{%ID%}}',prod.id)

//   return output;
// })

function replaceHtml(template,product){
  let output=template.replace('{{%IMAGE%}}',product.productImage)
  output=output.replace('{{%NAME%}}',product.name)
  output=output.replace('{{%MODELNAME%}}',product.modeName)
  output=output.replace('{{%MODELNO%}}',product.modelNumber)
  output=output.replace('{{%SIZE%}}',product.size)
  output=output.replace('{{%CAMERA%}}',product.camera)
  output=output.replace('{{%PRICE%}}',product.price)
  output=output.replace('{{%COLOR%}}',product.color)
  output=output.replace('{{%ID%}}',product.id)
  output=output.replace('{{%ROM%}}',product.ROM)
  output=output.replace('{{%DESC%}}',product.Description)

  return output;
}


const cont= new Date().toLocaleTimeString()
const myServer=http.createServer((request,response)=>{
  let {query,pathname:path}=url.parse(request.url,true)
  //const path=request.url
  if(path=='/' || path.toLowerCase()==='/home'){
    response.writeHead(200,{
      'Content-Type':'text/html',
      'my-header':'RadhaKrishna'
    })
      response.end(html.replace('{{%content%}}','you are in home page'))
  }
  else if(path.toLowerCase()==='/about'){
    response.writeHead(200,{
      'Content-Type':'text/html',
      'my-header':'RadhaKrishna'
    })
  response.end(html.replace('{{%content%}}','you are in about page'))
  }
  else if(path.toLowerCase()==='/contact'){
    response.writeHead(200,{
      'Content-Type':'text/html',
      'my-header':'RadhaKrishna'
    })
  response.end(html.replace('{{%content%}}','you are in contact page'))
  }
  else if(path.toLowerCase()==='/products'){
    if(!query.id){
      let productHtmlArray=products.map((prod)=>{
        return replaceHtml(productListHtml,prod)
      })
    response.writeHead(200,{
      'Content-Type':'text/html',
      'my-header':'RadhaKrishna'
    })
  response.end(html.replace('{{%content%}}',productHtmlArray.join(',')))
  }
  else{
    let prod=products[query.id]
    let productDetailResponseHtml=replaceHtml(productdetailHtml,prod)
    response.end(html.replace('{{%content%}}',productDetailResponseHtml))
  }
}
  else {
    response.writeHead(404,{
      'Content-Type':'text/html',
      'my-header':'RadhaKrishna'
    })
    response.end(html.replace('{{%content%}}','Error 404: Page not found!'))
  }
})

myServer.listen(3000,()=>{
  console.log("Server has started")
})

// myServer.close();