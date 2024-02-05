const express = require('express');
const fetch = require('node-fetch');
const cheerio=require('cheerio');
const cors=require('cors')
const app=express();
const fs = require('fs');
const jsonParser = express.json()
app.use(cors())

app.get("/api/all",()=>get_all())
async function get_all(req,res) {
  try {
    let arr = new Array()
    let steam= JSON.parse(get_steam()) 
    let gog=JSON.parse(get_gog())
    arr=arr.concat(steam,gog)
    
    
  } catch (error) {
    console.log(error);
  }
}
async function get_steam(){
  try {
    let res_text= JSON.stringify(arr)
    url="https://store.steampowered.com/api/featuredcategories?language=russian&cc=UA"
    const response = await fetch(url)
    if(response.status !== 200) 
      throw new Error()
    text=await response.text()
    file_text=JSON.parse(text)
    let specials=file_text.specials
    let arr=new Array();
    for(let ch of specials.items){
            if(ch.discounted){
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
async function get_data(url){
  const response=await fetch(url)
  try {
    
  if(response.status !== 200) throw new Error()
    text=await response.text()
    console.log(text)
   return text
  } catch (error) {
    console.log(error);
    return undefined
  }
}
app.get("/api/steam",async function(req,res) {
    
    try {
        url="https://store.steampowered.com/api/featuredcategories?language=russian&cc=UA"
        const response = await fetch(url)
        
        if(response.status !== 200) throw new Error()
        text=await response.text()
        file_text=JSON.parse(text)
        let specials=file_text.specials
        let arr=new Array();
        //var obj1={id,name:any,discounted,discount_percent,original_price,final_price,currency,large_capsule_image,small_capsule_image,header_image,shop}
        for(let ch of specials.items){
            if(ch.discounted===true){
                game_link="https://store.steampowered.com/api/appdetails?appids="+ch.id+"&language=russian&cc=UA"
                game_inf_get=await get_data(game_link)
                game_inf=JSON.parse(game_inf_get)
                let arr1=new Array();
                if(game_inf[''+ch.id+''].success)
                for(let genre of game_inf[''+ch.id+''].data.genres)
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
        res.send(res_text)
      } catch (error) {
        console.log(error);
      }
})
app.get("/api/epic", async function(req,res) {
    url="https://store.epicgames.com/graphql?operationName=searchStoreQuery&variables=%7B%22allowCountries%22:%22UA%22,%22category%22:%22games%2Fedition%2Fbase%22,%22count%22:40,%22country%22:%22UA%22,%22effectiveDate%22:%22[,2022-12-07T09:14:18.439Z]%22,%22keywords%22:%22%22,%22locale%22:%22ru%22,%22onSale%22:true,%22sortBy%22:%22relevancy,viewableDate%22,%22sortDir%22:%22DESC,DESC%22,%22start%22:0,%22tag%22:%22%22,%22withPrice%22:true%7D&extensions=%7B%22persistedQuery%22:%7B%22version%22:1,%22sha256Hash%22:%2213a2b6787f1a20d05c75c54c78b1b8ac7c8bf4efc394edf7a5998fdf35d1adb0%22%7D%7D"
    try {
        const response = await fetch(url,{
          "headers": {
            "accept": "application/json, text/plain, */*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Not.A/Brand\";v=\"24\", \"Opera GX\";v=\"92\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "EPIC_DEVICE=e25d0e85616d48ebb23a6db860e24b85; MUID=2643c6ab7427436da44ba84ea3e8a0a0; _tald=dac9a8a3-e510-4069-8365-43b5cdccd3ff; EPIC_SSO_RM=43cb9bf52ead4e3b8727a140c904373a; EPIC_LOCALE_COOKIE=ru; EPIC_LOCALE_COOKIE=ru; HasAcceptedAgeGates=general%3A18; fptctx2=taBcrIH61PuCVH7eNCyH0FFaWZWIHTJWSYlBtG47cVt%252fh1%252bCSQC5BsZk9pfFcKQ9IdhApAO19npnQnrH9P7H3uao6ppfV0szhAykUYNKN%252fcA%252b8tLUgGPP%252fCA2yUFZK1C7SmjFuEQjDSm8PeOKSbqcZd4Q18RJLieWI5EWbU5kdmokZPxOHrT8TBICNoekkDjioJeQ6onLyQnVHKnTSjZTs3bDeBxvKyI1CXronmPCPgZkppilPAR3Ei5qdTItMdMlX8miEelgItvKQrN7VR8ATgLaxHFp%252fPhgmdrduS7th9wDFkaKR1OklQcHq2J3i7P; EPIC_LOCALE=ru; EPIC_SSO=43cb9bf52ead4e3b8727a140c904373a; EPIC_BEARER_TOKEN=07d7a95d17e04b33811925b2c2a8a4ec; EPIC_EG1=eg1~eyJraWQiOiJ0RkMyVUloRnBUTV9FYTNxY09kX01xUVQxY0JCbTlrRkxTRGZlSmhzUkc4IiwiYWxnIjoiUFMyNTYifQ.eyJhcHAiOiJkaWVzZWx3ZWIiLCJzdWIiOiI2MGE1YjcxNDk0MDU0NjkzYmIxZDIzMjAyNWE4ZTE5YiIsImR2aWQiOiJlMjVkMGU4NTYxNmQ0OGViYjIzYTZkYjg2MGUyNGI4NSIsIm12ZXIiOmZhbHNlLCJjbGlkIjoiODc1YTNiNTdkM2E2NDBhNmI3ZjliNGU4ODM0NjNhYjQiLCJkbiI6ImxvcGF0aW4wOSIsImFtIjoidG9rZW5fdG9fdG9rZW4iLCJwIjoiZU5xbFZsdHkyekFNdkVcL0hINUZqdXcxbmRJTis5UVlRQ2NtWThEVjhPSEZQWDVDV0ZOdXBhOFg5c2lpU0MyQ3hXTmtIcDdKTXd1ZE9reFQrdEl6dGVoWHdRUGcyYlFUMExpU1JJQXlZMm1ZbG5USFprb1JFemtaQk5tR3dvUGtjS0JFeEpiSkRRYms2aCtcL2pPWkRTWlp0RVFWdXZwdFVZYkZwKzR5MkZCOVRPWVwvQ0JEaUNQTTdqWVBjRzIrOTVzWGpaUDI4M3U1Ym5yR3JWK1hqK3R0XC9BRG01ZXUzYTAwZFFIQ2NjS2xoS1lraFRaUjBtajRsMWQ5SUxUcVBoNm4wMnhYXC9wS3dDRloxN2gwcmJOYVFBc2hYVGtcL0VQUVJVekVmMFhEanVLU1lYam1lMWpyOEw0aHBNb0NCQjVjUERzZVE5TjJ4YzNnV0JuUFlTZkdrZFEyazNaK2o2SGtPc3lDRlpES1dWUTZqOUV0bHJPQzRoK3FMME1UVkZzVnlISVNBdXlwRnpNRTdOekg2SVNETjUwK3U3aFVvdW8yMmFHNXJpWE05aThPTlg0Wk9EV0ZDaWsxUjFuT2hBYVpMWURSWHdHNHhwWnFMT2hVTGVRZU1yMGJOYUZKOW90OWM5S28yUEdBNGtrU3dEV1lsZnpmdU40cjVjS0JxK05aU1NwemZoeER4TDVkSUROTDBpVjk1cEoxOVwvbHRoM0c5cHNic3dMejdPaEdEbjhOV096MzV6bVprRU1Ec0c4b0IzSTRvV29SZDI0blBmWlcrNFNkbmJwWDBaMmJuaWYrN3BZdEh5dFJIRkJGYWR6RW1OMFlmSDFDQnJqcjJyUlZSY1hycmNndU5Zb2E3N0ZJY3Z3RkxOQ0htRHBEdmlCbEp3bldRY1NzcFY3Wm5nS05UbXJ6MEh1Z2RzMnU4cDg5UE5XbDBrcnNyMFQ5Y21BcFo3SHBLcjlZUjV6a1kzb2VkTGFaNlp6WU5EZkp6TURaY2d1N1wvXC81M1ZvYXN6UzdMalwvekpQeEZlTnc3NDhxVmtEVis0ZU5TeHZMeHZqMXl1M2h6SWxPU3ZIS2JxWm1QSWdwZ2RyajBySHZTK3Z4clZicmFOdlwveENTeDkrRXg2bFRcL1wvVHpnNTYxak1HSElBVXlickR4amxBeGM9IiwiaWFpIjoiNjBhNWI3MTQ5NDA1NDY5M2JiMWQyMzIwMjVhOGUxOWIiLCJzZWMiOjAsImNsc3ZjIjoiZGllc2Vsd2ViIiwibHB2IjoxNjcwNDAwMzAyLCJ0IjoicyIsImljIjp0cnVlLCJleHAiOjE2NzA0MjkwOTgsImlhdCI6MTY3MDQwMDMwMiwianRpIjoiMjhjMjMyYTZlZjBjNDRlNGE5MjkyMWM1YWMzNzdlZmQifQ.Acr9DIodjf0uJfc_wdfynkmVAQ3DsOnAs23Ft_JS9XkvHlVOiN7LyOBV2YVWM_I4TJECJJL97HEWvNYWT-bzEa9F; REFRESH_EPIC_EG1=eg1~eyJraWQiOiJ0RkMyVUloRnBUTV9FYTNxY09kX01xUVQxY0JCbTlrRkxTRGZlSmhzUkc4IiwiYWxnIjoiUFMyNTYifQ.eyJzdWIiOiI2MGE1YjcxNDk0MDU0NjkzYmIxZDIzMjAyNWE4ZTE5YiIsImR2aWQiOiJlMjVkMGU4NTYxNmQ0OGViYjIzYTZkYjg2MGUyNGI4NSIsInQiOiJyIiwiY2xpZCI6Ijg3NWEzYjU3ZDNhNjQwYTZiN2Y5YjRlODgzNDYzYWI0IiwiZXhwIjoxNjcwNTE1NTAyLCJhbSI6InRva2VuX3RvX3Rva2VuIiwianRpIjoiMmY3ZjU1MTZiYjRiNDcwMzg1NjE3NjY5MmU3OTlkYjMifQ.AZx83lq1Ey8qLZKtGGgtgvWzsKbVokFTT45Z9tYcgMxLvYwPAMw4JTeAAcIQ2h43ZcxQDEy4Bcy6xC9lDjgQDGc0; refreshTokenExpires=2022-12-08T16%3A05%3A02.727Z; storeTokenExpires=2022-12-07T16%3A04%3A58.723Z; __cf_bm=Rklf9P1i3A6bv5.F09Vg0_Fuq5GtSWW9SM0MfztE5wQ-1670404422-0-AXuaXgiB8HKG2SpuN3+MZzDY2K+Bn94w9tALqMIVp1ckswpq0MM0krjQSK+1KbQgtr0Zs6VIv07uOKWiXMCfEHo=",
            "Referer": "https://store.epicgames.com/ru/browse?sortBy=relevancy&sortDir=DESC&priceTier=tierDiscouted&category=Game&count=40&start=0",
            "Referrer-Policy": "no-referrer-when-downgrade"
          },
          "body": null,
          "method": "GET"
        })

        if(response.status !== 200) throw new Error()
        text=await response.text()
        
        let file_text=JSON.parse(text)
        let objects=file_text.data.Catalog.searchStore.elements
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
        }
        res_text= JSON.stringify(file_text)

        
        res.send(res_text)
      } catch (error) {
        console.log(error);
      }

})
function foundPricePer(discount_price,original_price){
  const persent=((original_price-discount_price)/original_price)*100
  return persent
}
function image_res_gog(link,formater,format){
  res=link+"_"+formater+format
  return res
}
const parseHTML = html =>{
  const data=[]
  html=html.replace(/\s+/g,' ')
  const $=cheerio.load(html)
  const list=$('ul li').each((i,elem)=>{
    data.push({

    })
  })

}
app.get("/api/gog",async function(req,res) {
    url="https://www.gog.com/games/ajax/filtered?mediaType=game&page=1&price=discounted&sort=popularity&countryCode=UA"
    try {
        const response = await fetch(url)

        if(response.status !== 200) throw new Error()
        let text=await response.text()
        file_text=JSON.parse(text)
        let arr=new Array();
        for(ch of file_text.products){
          if(ch.isDiscounted){
          site="https://www.gog.com"
          //main="https://api.gog.com/products/{"+id+"}"
          //price="https://api.gog.com/products/1863909997/prices?countryCode=UA";
          
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
        console.log(arr)
        res_text= JSON.stringify(arr)
        res.send(res_text)
      } catch (error) {
        console.log(error);
      }
})
app.get("/api/uplay",async function(req,res) {
  const url="https://store.ubi.com/ie/deals?lang=uk-UA&prefn1=productTypeRefinementString&prefv1=games&categoryslot=true&format=ajax"
  const response = await fetch(url, {
    "headers": {
      "accept": "text/html, */*; q=0.01",
      "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-ch-ua": "\"Chromium\";v=\"106\", \"Not.A/Brand\";v=\"24\", \"Opera GX\";v=\"92\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://store.ubi.com/ie/deals?lang=uk-UA&lang=uk_UA",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  });
  const result=parseHTML(await response.text());


})
app.listen(3001,()=>{
    console.log('Server listesting at')
})
