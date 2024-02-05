const express = require('express');
const fetch = require('node-fetch');
const app=express();
const fs = require('fs');
const cors=require('cors')
const hours=24;
app.use(cors())
setInterval(function(){

},1000*60*60*hours)
const filePath="test.json"
async function give_all(req,res){
    const content = fs.readFile(filePath, "utf8");
    let res_text= JSON.stringify(content)
    res.send(res_text)
}
async function give_steam(req,res){
    const content = fs.readFile(filePath, "utf8");
    let res_text=content.steam;
    res.send(res_text)
}
async function give_gog(req,res){
    const content = fs.readFile(filePath, "utf8");
    let res_text=content.gog;
    res.send(res_text)
}
async function give_epic(req,res){
  const content = fs.readFile(filePath, "utf8");
  let res_text=content.epic;
  res.send(res_text)
}
async function get_all(req,res) {
    try {
      let arr = new Array()
      let steam= await JSON.parse(get_steam()) 
      let gog=await JSON.parse(get_gog())
      let epic=await JSON.parse(get_epic())
      let arrs={
        "steam":steam,
        "gog":gog,
        "epic":epic
      }
      fs.writeFileSync(filePath,JSON.stringify(arrs),"utf-8");
    } catch (error) {
      console.log(error);
    }
  }
  async function get_steam(){
    try {
      let res_text= JSON.stringify(arr)
      url="https://store.steampowered.com/api/featuredcategories?language=russian&cc=UA"
      const response = await fetch(url)
      if(response.status !== 200) throw new Error()
          text=await response.text()
          file_text=JSON.parse(text)
          let specials=file_text.specials
          let arr=new Array();
          for(let ch of specials.items){
              if(ch.discounted){
                  arr.push(ch.id)
                  game_link="https://store.steampowered.com/api/appdetails?appids="+ch.id+"&language=russian&cc=UA"
                  game_inf_get=await fetch(game_link)
                  game_inf=JSON.parse(game_inf_get)
                  var arr1=new Array();
                  for(var genre of game_inf.data.genres)
                  {
                   arr1.push(genre.description) 
                  }
                  let obj={
                      id:ch.id,
                      name:ch.name,
                      discount_percent:ch.discount_percent,
                      original_price: ch.original_price,
                      final_price: ch.final_price,
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
        return res_text
      } catch (error) {
        console.log(error);
      }
  }
  async function get_epic(){
    
  }
  async function get_data(url){
    const response=await fetch(url)
    try {
      
    if(response.status !== 200) throw new Error()
      const text=await response.text()
      console.log(text)
     return text
    } catch (error) {
      console.log(error);
      return 
    }
  }
app.get("/api/steam",give_steam())
app.get("/api/gog",give_gog())
app.get("/api/epic",give_epic())
get_all();