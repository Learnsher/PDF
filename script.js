// 移除與 PDF 相關的代碼
// document.getElementById('compressButton').addEventListener('click', function() {
//     const fileInput = document.getElementById('imageInput');
//     const quality = document.getElementById('quality').value / 100;
//     const is8Bit = document.getElementById('bitDepth').checked;

//     if (fileInput.files.length === 0) {
//         alert('請選擇一張圖片！');
//         return;
//     }

//     const file = fileInput.files[0];
//     const img = new Image();
//     const reader = new FileReader();

//     reader.onload = function(event) {
//         img.src = event.target.result;
//     };

//     img.onload = function() {
//         const canvas = document.getElementById('canvas');
//         const ctx = canvas.getContext('2d');
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);

//         // 轉存為 PNG
//         const pngDataUrl = canvas.toDataURL('image/png', quality);
        
//         // 如果需要轉為 8 位元深度 PNG，這裡可以進行處理
//         if (is8Bit) {
//             // 獲取圖像數據
//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             const data = imageData.data;

//             // 使用調色板減少顏色數量
//             const colorMap = {};
//             const newData = new Uint8ClampedArray(data.length);
//             let colorIndex = 0;

//             // 顯示進度條
//             const progressContainer = document.getElementById('progressContainer');
//             const progressBar = document.getElementById('progressBar');
//             const progressText = document.getElementById('progressText');
//             progressContainer.style.display = 'block';

//             for (let i = 0; i < data.length; i += 4) {
//                 const r = data[i];
//                 const g = data[i + 1];
//                 const b = data[i + 2];
//                 const key = `${r},${g},${b}`;

//                 if (!(key in colorMap)) {
//                     if (colorIndex < 256) {
//                         colorMap[key] = colorIndex++;
//                     } else {
//                         // 如果顏色數量超過 256，則使用最接近的顏色
//                         const closestColor = findClosestColor(colorMap, r, g, b);
//                         newData[i] = closestColor[0];
//                         newData[i + 1] = closestColor[1];
//                         newData[i + 2] = closestColor[2];
//                     }
//                 } else {
//                     const index = colorMap[key];
//                     newData[i] = data[i];
//                     newData[i + 1] = data[i + 1];
//                     newData[i + 2] = data[i + 2];
//                 }
//                 newData[i + 3] = data[i + 3]; // Alpha 通道保持不變

//                 // 更新進度條
//                 if (i % (data.length / 100) === 0) {
//                     const progress = (i / data.length) * 100;
//                     progressBar.value = progress;
//                     progressText.innerText = `處理中: ${Math.round(progress)}%`;
//                 }
//             }

//             // 將處理後的數據放回 Canvas
//             const newImageData = new ImageData(newData, canvas.width, canvas.height);
//             ctx.putImageData(newImageData, 0, 0);

//             // 轉存為 8 位元深度 PNG
//             const eightBitPngDataUrl = canvas.toDataURL('image/png', quality);
//             const downloadLink = document.getElementById('downloadLink');
//             downloadLink.href = eightBitPngDataUrl;
//             downloadLink.download = 'compressed_image_8bit.png';
//             downloadLink.style.display = 'block';
//             downloadLink.innerText = '下載壓縮後的 8 位元圖片';
//         } else {
//             const downloadLink = document.getElementById('downloadLink');
//             downloadLink.href = pngDataUrl;
//             downloadLink.download = 'compressed_image.png';
//             downloadLink.style.display = 'block';
//             downloadLink.innerText = '下載壓縮後的圖片';
//         }
//     };

//     reader.readAsDataURL(file);
// });

// 找到最接近的顏色
// function findClosestColor(colorMap, r, g, b) {
//     let closestColor = null;
//     let closestDistance = Infinity;

//     for (const key in colorMap) {
//         const [cr, cg, cb] = key.split(',').map(Number);
//         const distance = Math.sqrt((r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2);
//         if (distance < closestDistance) {
//             closestDistance = distance;
//             closestColor = [cr, cg, cb];
//         }
//     }

//     return closestColor || [r, g, b]; // 如果沒有找到，返回原顏色
// } 