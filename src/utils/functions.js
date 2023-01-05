/*redGenres functions */ 
export const redGen=(gen)=>{
    
  if(gen[0]!=null||undefined||''||""){
  gen=gen.toLowerCase().trim()
  gen=replaceAt(gen,0,gen[0].toUpperCase())
  }
  return gen;
}
export const getUnique = (arr) => {
  return arr.filter((el, ind) => ind === arr.indexOf(el));
};
const replaceAt=(str,index, char)=> {
  return str.substr(0, index) + char + str.substr(index + 1, str.length);
};
/*Routings function */
export const getGenresFromGame=(games)=>{
    let genres=[]
    games.map(game=>game.genres.map(genre=>genres.push(redGen(genre))))
    genres=getUnique(genres)
  
    return genres
  }
/*In functions */

/*ListComp functions */
export const genreFilter = (arr, gen) => {
  console.log(arr)
  console.log(gen)
  console.log(gen.length==0)
  if(gen.length===0) return arr;
  return arr.filter(({name: arre}) => arre.some(n=>gen.includes(n)));
}

export const order=(arr,order)=>{
  if(!order.asc||!order.name) return arr;
  else
    return sorted(sortBy([order.name],arr),order.asc)
  
}
/*Order functions*/
const compare = (a, b) => {
  if (a === b) return 0;
  if (a > b) return 1;
  if (a < b) return -1;
}
const sorted=(arr,str)=>{
  if(str==='asc')
  return arr
  else if(str==='desc') 
  return arr.reverse()
}
const sortBy = (fields, arr) => {
  return arr.sort((a, b) => {
    for (let field of fields) {          
      const result = compare(a[field], b[field]);
      if (result === 0) continue;
      return result;
    }
    return 0;
  })
}
