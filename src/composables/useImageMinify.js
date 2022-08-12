import { reactive } from 'vue'
import ImageCompressor from '@/services/image'

//! EDIT ONLY IF YOU KNOW WHAT YOU ARE DOING
export const config = reactive({
    file: null,
    imgName: '',
    originImgUrl: '',
    originMimeType: 'auto',
    originSize: 0,
    originImgWidth: 'auto',
    originImgHeight: 'auto',
    outputImgUrl: '',
    outputMimeType: 'auto',
    outputImgWidth: 'auto',
    outputImgHeight: 'auto',
    outputSize: 0,
    compressRatio: 0,
    quality: 0.6,
    result: '',
})

export const compressImage = (file) => {
    const options = {
        file,
        quality: config.quality,
        beforeCompress: (result) => {
            config.imgName = result.name
            config.originImgWidth = result.width
            config.originImgHeight = result.height
            config.originSize = result.size
            config.originMimeType = result.type
            console.log('Size : ', result.size)
            console.log('Type : ', result.type)
            ImageCompressor.file2DataUrl(result, function (url) {
                config.originImgUrl = url
            })
        },
        success: function (result) {
            console.log('result: ', result)
            config.result = result
            config.outputImgWidth = result.width
            config.outputImgHeight = result.height
            config.outputSize = result.size
            config.outputMimeType = result.type
            config.compressRatio = (((file.size - result.size) / file.size) * 100).toFixed(2) + '%'
            ImageCompressor.file2DataUrl(result, function (url) {
                config.outputImgUrl = url
            })
        },
    }
    new ImageCompressor(options)
}

export default function useImageMinify() {
    return {
        config,
        result: config.result,
        compressImage,
    }
}
