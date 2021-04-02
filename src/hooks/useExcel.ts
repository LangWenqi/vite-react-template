
import XLSX from 'xlsx';

type T_HandleData = (list: any[]) => void;
type T_getData = (el: any) => ({[key: string]: any});

export const useExportExcel = () => {

  const importExcel = (file: File, getData: T_getData, handleData?: T_HandleData) => {
    const fileReader = new FileReader();
    fileReader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const workbook = XLSX.read(event.target?.result, { type: 'binary' });
        // let data = []; // 存储获取到的数据
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            const list = (XLSX.utils.sheet_to_json(workbook.Sheets[sheet])).map(el => {
              return getData(el);
            })
            if (handleData) {
              handleData(list);
            }
            
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
       
      } catch (e) {
        console.log(e.message);
      }
    };
    fileReader.readAsBinaryString(file);
  }
  const exportSheet = (data: any[], filename: string, titleLen: number, width?: number) => {
    const wsName = 'Sheet1';
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);
    if (titleLen > 0) {
      const arr = [];
      for (let i = 0; i < titleLen; i++) {
        arr.push({
          wch: width
        });
      }
      ws['!cols'] = arr;
    }
    XLSX.utils.book_append_sheet(wb, ws, wsName);
    XLSX.writeFile(wb, filename);
  }
  
  return { importExcel, exportSheet };
}
