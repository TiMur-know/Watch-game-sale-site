const express =require('express')
const fetch = require('node-fetch')
const cors=require('cors')
const fs=require('fs');
const app=express();
const hours=24
app.use(cors())
get_all();

setInterval(function(){
    get_all();
},1000*60*60*hours)
const filePath="test.json"
async function get_all(){
    console.log('Get_all')
    try{
        console.log('Data update...')
    let arr = new Array()
      let steam= JSON.parse(await get_steam()) 
      let gog=JSON.parse(await get_gog())
      //let epic=JSON.parse(await get_epic())
      let arrs={
        "steam":steam,
        "gog":gog,
       // "epic":epic
      }
      fs.writeFileSync(filePath,JSON.stringify(arrs),"utf-8");
      console.log('Data updated!')
      return
    }
    catch(error){
        console.log(error)
    }
}
async function get_steam(){
    try {
        url="https://store.steampowered.com/api/featuredcategories?language=russian&cc=UA"
        const response = await fetch(url)
        if(response.status !== 200) 
          throw new Error()
        console.log('Steam data get...')
        text=await response.text()
        file_text=JSON.parse(text)
        let specials=file_text.specials
        let arr=new Array();
        for(let ch of specials.items){
                if(ch.discounted){
                    game_link="https://store.steampowered.com/api/appdetails?appids="+ch.id+"&language=russian&cc=UA"
                    game_inf_get=await get_data(game_link)
                    game_inf=JSON.parse(game_inf_get)
                    let arr1=new Array()
                    if(game_inf[''+ch.id+''].success)
                    for(let genre of game_inf[''+ch.id+''].data.genres)
                    {
                     arr1.push(genre.description) 
                    }
                    if(ch.currency=="UAH")
                    ch.currency="₴"
                    let obj={
                        id:ch.id,
                        name:ch.name,
                        discount_percent:ch.discount_percent,
                        original_price: normPrice(ch.original_price),
                        final_price: normPrice(ch.final_price) ,
                        currency: ch.currency,
                        link:"https://store.steampowered.com/app/"+ch.id,
                        genres:arr1,
                        large_image: ch.large_capsule_image,
                        small_image: ch.small_capsule_image,
                        medium_image: ch.header_image,
                        shop: "steam"
                    }
                    arr.push(obj)
                }
            }
           res_text= JSON.stringify(arr)
            console.log('Steam data get!')
        return res_text
      } catch (error) {
        console.log(error);
      }
}
async function get_gog(){
    url="https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&price=discounted&sort=popularity&countryCode=UA"
  try {
      const response = await fetch(url)

      if(response.status !== 200) throw new Error()
      console.log('Gog data get...')
      var text=await response.text()
      file_text=JSON.parse(text)
      var arr=new Array();
      for(ch of file_text.products){
        if(ch.isDiscounted){
        site="https://www.gog.com"
        

        let obj={
          id:ch.id,
          name:ch.title,
          discount_percent:ch.price.discountPercentage,
          original_price: ch.price.baseAmount,
          final_price: ch.price.finalAmount,
          currency: ch.price.symbol,
          link:site+ch.url,
          genres:ch.genres,
          large_image: image_res_gog(ch.image,"ggvgl",".jpg"),
          small_image: image_res_gog(ch.image,"ggvgt",".jpg"),
          medium_image: image_res_gog(ch.image,"ggvgm",".jpg"),
          shop: "gog"
      }
      arr.push(obj)
    }

    }
      res_text= JSON.stringify(arr)
      console.log('Gog data get!')
      return res_text
    } catch (error) {
      console.log(error);
    }
}
async function get_epic(){
    url="https://store.epicgames.com/graphql?operationName=searchStoreQuery&variables=%7B%22allowCountries%22:%22UA%22,%22category%22:%22games%2Fedition%2Fbase%22,%22count%22:40,%22country%22:%22UA%22,%22keywords%22:%22%22,%22locale%22:%22ru%22,%22sortBy%22:%22relevancy,viewableDate%22,%22sortDir%22:%22DESC,DESC%22,%22tag%22:%22%22,%22withPrice%22:true%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%227d58e12d9dd8cb14c84a3ff18d360bf9f0caa96bf218f2c5fda68ba88d68a437%22%7D%7D"
    try {
        const response =await fetch(url, {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "ru-RU,ru;q=0.9",
              "if-none-match": "W/\"16e5b-tCjo4BuygL1B2FDtvbs6tz/cJBc\"",
              "sec-ch-ua": "\"Opera GX\";v=\"93\", \"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"107\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin",
              "x-requested-with": "XMLHttpRequest",
              "cookie": "EPIC_LOCALE_COOKIE=ru; __cf_bm=FX8ffebGCZV_9vTjkO2lPNZf0fVe2H_4hG70kVyi78I-1672922195-0-AZsacAnccH+Cum19crAFapTHE9GZHRFF86O3GqY9y43Cfnu5dtMd4nBppP6091FVMaEi9aK6ScZwdwunD43/Nm4kgczKjCLs45slR8LzXUFRJy8k2jmbRN/9cxN+PUtlId9sGkOz2KxeGP63MY/4TVo98z48eMtUrd/jDsVO6CM3hrR1cNBiFVdW/NeQarB07Q==",
              "Referer": "https://store.epicgames.com/ru/browse?sortBy=relevancy&sortDir=DESC&category=Game&count=40",
              "Referrer-Policy": "no-referrer-when-downgrade"
            },
            "body": null,
            "method": "GET"
          });


        if(response.status !== 200) throw new Error()
        console.log('Epic data get...')
        text=await response.text()
        
        let file_text=JSON.parse(text)
        let objects=file_text.data.Catalog.searchStore.elements
        let arr=new Array();
        for(let ch of objects){
          let obj={
            id:ch.id,
            name:ch.title,
            discount_percent: foundPricePer(ch.price.totalPrice.discountPrice,ch.price.totalPrice.originalPrice),
            original_price: ch.price.totalPrice.originalPrice,
            final_price: ch.price.totalPrice.discountPrice,
            currency: ch.currency,
            link:"https://store.epicgames.com/ru/p/"+ch.catalogNs.mappings[0].pageSlug,
            genres:arr1,
            large_image: ch.keyImages,
            small_image: ch.small_capsule_image,
            medium_image: ch.header_image,
            shop: "epic"
        }
        arr.push(obj)
        }
        res_text= JSON.stringify(arr)
        console.log('Epic data get!')
        return res_text
      } catch (error) {
        console.log(error);
      }
}
async function get_data(url){
    const response=await fetch(url)
    try {
      
    if(response.status !== 200) throw new Error()
      text=await response.text()
     return text
    } catch (error) {
      console.log(error);
      return undefined
    }
  }
  
app.get("/api/all",async function(req,res){
    const content = fs.readFileSync(filePath,'utf-8');
    let steam=JSON.parse(content).steam
    let gog=JSON.parse(content).gog
    let res_text=new Array()
    res_text=res_text.concat(steam,gog);

    res.send(JSON.stringify(res_text))
})
app.get("/api/steam",async function(req,res){
    const content = fs.readFileSync(filePath,'utf-8');
    let res_text=JSON.stringify(JSON.parse(content).steam)

    console.log(res_text)
    res.send(res_text)
})
app.get("/api/gog",async function(req,res){
    const content = fs.readFileSync(filePath,'utf-8');
    let res_text=JSON.stringify(JSON.parse(content).gog)
    res.send(res_text)
})
/*app.get("/api/epic",async function(req,res){
    const content = fs.readFile(filePath, "utf8");
    let res_text=content.epic;
    res.send(res_text)
})*/
const port=3001
app.listen(port,()=>{
    console.log('Server listesting at '+port)
})
const image_res_gog=(link,formater,format)=>{
  res=link+"_"+formater+format
  return res
}
const normPrice=(str)=>{
  return parseFloat(str/100).toFixed(2)
}