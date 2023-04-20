// Tạo thanh chuyển
const pageDeviceBox = document.querySelector('.page_device_box')

// Xuất thanh chuyển trang ra màn hình
renderPageDivice(pageSize) // biến pageSize đực tính từ file product-list.js

// Hàm tạo các thanh chuyển
function renderPageDivice(number){
  if(number > 1){
    const pageIndexs = Array.from({length: number}, (_, i) => i + 1)
    
    function createPageItem(e) {
      let tag = 'a'
      let href = `href=\"?page=${e}\"`
      if(e === parseInt(page)){
        tag = 'span'
        href = ''
      }
      const pageItemClass = e === parseInt(page) ? 'page_device_box_item current_page page1' : 'page_device_box_item page1'
      return `
        <${tag} ${href} href="?page=${e}" class="${pageItemClass}">
          ${e}
        </${tag}>
      `
    }
    
    const pageItems = pageIndexs.map(createPageItem).join('')
    pageDeviceBox.innerHTML = pageItems
  } else {
    pageDeviceBox.innerHTML = ''
  }
}


// Thêm class disable và ẩn cho các nút Trước, Sau
const pageNext = document.querySelector('.page_device_box_next')
const pagePre = document.querySelector('.page_device_box_pre')


// ẩn các nút 
hiddenNextPre(pageSize)

// Hàm ẩn các nút nếu chỉ có 1 trang
function hiddenNextPre(pageSize){
  if(pageSize < 2){
    pageNext.classList.add('hidden')
    pagePre.classList.add('hidden')
  }
}


// Vô hiệu hóa các nút next, pre nếu đang ở trang cuối hoặc trang đầu
if( parseInt(page) === 1){
    pagePre.classList.add('disable')
}

if( parseInt(page) === pageSize){
  pageNext.classList.add('disable')
}

// Thao tác click next, pre
if(parseInt(page) < pageSize){
  pageNext.addEventListener('click', () => {
      let pageNew = parseInt(page) + 1
      const newUrl = window.location.pathname + '?' + `page=${pageNew}`
      window.location.href = newUrl
  })
}

if(parseInt(page) > 1){
  pagePre.addEventListener('click', () => {
    let pageNew = parseInt(page) - 1
      const newUrl = window.location.pathname + '?' + `page=${pageNew}`
      window.location.href = newUrl
  })
}