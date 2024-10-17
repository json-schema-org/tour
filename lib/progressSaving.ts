export function setCheckpoint(path: string) {
  if (typeof window === "undefined") return false;
  const checkpoint = path

  localStorage.setItem("checkPoint", JSON.stringify(checkpoint));
}

export function getcheckPoint(){
  if (typeof window === "undefined") return false;

  const checkpoint = localStorage.getItem('checkPoint')
  
  if(checkpoint){
    return JSON.parse(checkpoint)
  }
  return null
}

export function setCode(chapter:number, lesson: number, code:string){
  if (typeof window === "undefined") return false;

  const codeData = JSON.parse(localStorage.getItem('codeData') || '{}');

  const key = `${chapter}.${lesson}`

  codeData[key] = code;

  localStorage.setItem('codeData',JSON.stringify(codeData))
}

export function getCode(chapter: number,lesson:number){    
  if (typeof window === "undefined") return false;

  const codeData = JSON.parse(localStorage.getItem('codeData') || '{}');

  const key = `${chapter}.${lesson}`;

  return codeData[key]
}

export function resetCode(chapter: number, lesson: number){    
  if (typeof window === "undefined") return false;

  const codeData = JSON.parse(localStorage.getItem('codeData') || '{}');

  const key = `${chapter}.${lesson}`;

  codeData[key] = null;
}