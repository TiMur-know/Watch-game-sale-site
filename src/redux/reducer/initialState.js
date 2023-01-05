 const initialState={
    games:[{name:"ster",discount_percent:50,original_price:1945,final_price:1600,currency:"E",
    link:"https://google.com",genres:["gen 1","gen 2"],large_image:"https://cdn.britannica.com/24/2724-004-401141F5/Mirage.jpg?w=690&h=388&c=crop",
    small_image:"",medium_image:"",shop:"shop"},
    {name:"ster",discount_percent:50,original_price:1945,final_price:1600,currency:"E",
    link:"https://google.com",genres:["gen 1","gen 2"],large_image:"https://cdn.britannica.com/24/2724-004-401141F5/Mirage.jpg?w=690&h=388&c=crop",
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