export const replaceAt=(str,index, char)=> {
    return str.substr(0, index) + char + str.substr(index + 1, str.length);
  };
export const normalizePrice=(str)=>{
    let ene=str
    let num=ene.length-2;
    let s=str[num]
    ene=replaceAt(ene,num,",")+s
    return ene
}
export const image_res_gog=(link,formater,format)=>{
    res=link+"_"+formater+format
    return res
  }
