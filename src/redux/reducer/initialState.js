 const initialState={
    games:[{name:"Male",discount_percent:50,original_price:3045,final_price:2000,currency:"E",
    link:"https://google.com",genres:["Gen 5","Gen 2"],large_image:"https://cdn.britannica.com/24/2724-004-401141F5/Mirage.jpg?w=690&h=388&c=crop",
    small_image:"",medium_image:"",shop:"shop"},
    {name:"Oler",discount_percent:50,original_price:1945,final_price:1600,currency:"E",
    link:"https://google.com",genres:["Gen 1","Gen 8"],large_image:"https://cdn.britannica.com/24/2724-004-401141F5/Mirage.jpg?w=690&h=388&c=crop",
    small_image:"",medium_image:"",shop:"shop"},
    {name:"Ampe",discount_percent:50,original_price:2000,final_price:1000,currency:"E",
    link:"https://google.com",genres:["Gen 5","Gen 1"],large_image:"https://cdn.britannica.com/24/2724-004-401141F5/Mirage.jpg?w=690&h=388&c=crop",
    small_image:"",medium_image:"",shop:"shop"}
],
    genres:[],
    genreFilters:[],
    orderBy:{
        name:"",
        asced:""
    },
    Api:{
        loading: false,
    data: [],
    error: ""
    }
}
export default initialState