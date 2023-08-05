import moment from "moment"

export const formatDate = (date: Date): string => {
  if (!date) return "";
  return moment(date).format("D/M/YY h:mm A")
};


export const processBotResponse = async ({ response, onChunk }: any) => {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let chunk = await reader?.read();
    let result = '';
    while (!chunk?.done) {
      const chunkData = decoder.decode(chunk?.value, { stream: true });
      result += chunkData;
      onChunk(result);
      chunk = await reader?.read();
    }  
};

export const splitStringIntoHeadersAndData = (inputString: string) => {
  const rows = inputString.trim().split('\n');
  const headersRow = rows[0].split('|').map(item => item.trim()).filter(Boolean);
  const separatorRegex = /^\s*(?:\|[-]+\s*)+\|$/;

  if (separatorRegex.test(rows[1])) {
    const dataRows = rows.slice(2, rows.length); // Skip the first two rows (headers and separator)

    const data = dataRows.map(row => {
      const rowData = row.split('|').map(item => item.trim()).filter(Boolean);
      const rowDataObject: Record<string, any> = {};
      for (let i = 0; i < headersRow.length; i++) {
        rowDataObject[headersRow[i]] = rowData[i];
      }
      return rowDataObject;
    });

    return {
      headers: headersRow,
      dataRows: data
    };
  } else {
    // Data rows are not available yet, return an empty string
    return {
      headers: [],
      dataRows: []
    };
  }
}

export const commandKeywords = ['SELECT','FROM','WHERE','GROUP', 'INNER','JOIN','LEFT','OUTER','BY','HAVING','INTERVAL','AS','CASE','WHEN','THEN','ELSE','END','AND','OR','NOT','IN','LIKE','IS','NULL','TRUE','FALSE','NOW','DATE','ORDER','BY','LIMIT','OFFSET','UNION','UNION','ALL','INTERSECT','EXCEPT','VALUES'];