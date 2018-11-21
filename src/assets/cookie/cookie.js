export function setcookie(c_name,c_value,expireHours) {
  let date=new Date();
  date.setHours(date.getHours()+expireHours);
  document.cookie=c_name+'='+escape(c_value)+';expire='+date.toUTCString()
}
export function getcookie(c_name) {
  let cookieArr=document.cookie.split(';')
  for (let i=0;i<cookieArr.length;i++){
    let c_value=cookieArr[i].trim();
    if (c_value.indexOf(c_name+'=')===0){
      return c_value.substring(c_name.length+1,c_value.length)//c_name还要加上=号的长度
    }
  }
  return false
}
export function delcookie(c_name) {
  setcookie(c_name,'',-1)
}
