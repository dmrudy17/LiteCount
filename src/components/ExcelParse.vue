<template>
    <input type="file" @change="onChange" />
</template>

<script>
import 'csvtojson'

export default {
    name: 'ExcelParse',
methods: {
    onChange(){
    const csvFilePath='../assets/TestItems.csv'
    const csv=require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        console.log(jsonObj);
    })

    }
}, 
}
</script>