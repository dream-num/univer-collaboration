


const { univerSheetCustom, CommonPluginData, UniverCore } = UniverPreactTs

const ipAddress = '47.100.177.253:8500'
const urlCollbaration = 'http://luckysheet.lashuju.com/univer/'
const config = {"type":"sheet","template":"DEMO1"}

initDocsByURL();

// insertUpdateButton()


function initDocsByURL(){
    if(location.search.indexOf('?id=') !== -1){
        const id = location.search.split('?id=')[1];
        openDocs(id,(json)=>{
            const universheetconfig = json.config;
            const id = json.id;

            const downUISheetsConfig = {
                container: 'universheet-demo',
            }
            const universheet = univerSheetCustom({
                univerConfig:{
                    id
                },
                coreConfig:JSON.parse(universheetconfig),
                uiSheetsConfig:downUISheetsConfig,
                collaborationConfig:{
                    url: `${'ws://'+ipAddress+'/ws/'}${id}`
                }
            });

            insertCopyButton(universheet)

        })
    }else{
        insertButton()
    }

}


// openDocs()
function insertUpdateButton() {
    // 创建一个输入框元素
    const input = document.createElement('input');
    input.type = 'text';

    document.body.appendChild(input);

    input.style.position = 'fixed';
    input.style.right = '0';
    input.style.top = '30px';

    // 创建一个按钮元素
    const button = document.createElement('button');
    button.textContent = '确定';

    document.body.appendChild(button);

    button.style.position = 'fixed';
    button.style.right = '0';
    button.style.top = '50px';


    // 添加按钮点击事件处理程序
    button.addEventListener('click', function() {
        // 获取输入框的值
        const inputValue = input.value;
        openDocs(inputValue,(json)=>{
            const universheetconfig = json.config;
            const id = json.id;

            const downUISheetsConfig = {
                container: 'universheet-demo',
            }
            const univerSheet = univerSheetCustom({
                univerConfig:{
                    id
                },
                coreConfig:JSON.parse(universheetconfig),
                uiSheetsConfig:downUISheetsConfig,
                collaborationConfig:{
                    url: `${'ws://'+ipAddress+'/ws/'}${id}`
                }
            });

            // const ids = univerSheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
            // console.info('ids===',ids)


        })

    });
}
function insertCopyButton(universheet) {
    // 创建一个按钮元素
    const button = document.createElement('button');
    button.textContent = '复制组件';

    document.body.appendChild(button);

    button.style.position = 'fixed';
    button.style.right = '0';
    button.style.top = '50px';


    // 添加按钮点击事件处理程序
    button.addEventListener('click', function() {
        // 获取输入框的值
        const univerId = universheet.getWorkBook().getContext().getUniver().getGlobalContext().getUniverId();
        
        
        const url = urlCollbaration + '?id='+univerId;
        copyTextToClipboard(url)
        alert('copy url success:' + url)

    });
}

function insertButton() {
    // 创建一个按钮元素
    const button = document.createElement('button');
    // 设置按钮文本
    button.textContent = 'New Docs';
    // 将按钮添加到body元素中
    document.body.appendChild(button);

    button.style.position = 'fixed';
    button.style.right = '0';
    button.style.top = '0';


    // 添加按钮点击事件处理程序
    button.addEventListener('click', function() {
        newDocsByDemo('DEMO1',true)
    });


    
}

function newDocsByDemo(demo = 'default',toolbar = false) {
    if(demo === 'default'){
        newDocs('http://'+ipAddress+'/new',config,(json)=>{
            const id = json.id;
            const config = json.config;

            
            if(config === 'default'){

                const uiSheetsConfig = {
                    container: 'universheet-demo',
                    layout: {
                        sheetContainerConfig: {
                            infoBar: false,
                            formulaBar: false,
                            toolbar,
                            sheetBar: false,
                            countBar: false,
                            rightMenu: false
                        }
                    }
                }

                const universheet = univerSheetCustom({
                    univerConfig:{
                        id
                    },
                    uiSheetsConfig,
                    collaborationConfig:{
                        url: `${'ws://'+ipAddress+'/ws/'}${id}`
                    }
                });

                insertCopyButton(universheet)
            }
            
        })
        return
    }

    newDocs('http://'+ipAddress+'/new',config,(json)=>{
            const id = json.id;
            const config = json.config;

            
            if(config === 'default'){

                const {
                    DEFAULT_WORKBOOK_DATA_DEMO1,
                    DEFAULT_WORKBOOK_DATA_DEMO2,
                    DEFAULT_WORKBOOK_DATA_DEMO3,
                    DEFAULT_WORKBOOK_DATA_DEMO4,
                    DEFAULT_WORKBOOK_DATA_DEMO5,
                    DEFAULT_WORKBOOK_DATA_DEMO6
                } = CommonPluginData
            
                const demoInfo = {
                    DEMO1: DEFAULT_WORKBOOK_DATA_DEMO1,
                    DEMO2: DEFAULT_WORKBOOK_DATA_DEMO2,
                    DEMO3: DEFAULT_WORKBOOK_DATA_DEMO3,
                    DEMO4: DEFAULT_WORKBOOK_DATA_DEMO4,
                    DEMO5: DEFAULT_WORKBOOK_DATA_DEMO5,
                    DEMO6: DEFAULT_WORKBOOK_DATA_DEMO6
                }
                const uiSheetsConfig = {
                    container: 'universheet-demo',
                    layout: {
                        sheetContainerConfig: {
                            infoBar: false,
                            formulaBar: false,
                            toolbar,
                            sheetBar: false,
                            countBar: false,
                            rightMenu: false
                        }
                    }
                }
                const baseSheetsConfig = {
                    selections: {
                        'sheet-01': [
                            {
                                selection: {
                                    startRow: 11,
                                    endRow: 11,
                                    startColumn: 1,
                                    endColumn: 1
                                },
                                cell: {
                                    row: 11,
                                    column: 1
                                }
                            }
                        ]
                    }
                }
            
                const coreConfig = UniverCore.Tools.deepClone(demoInfo[demo])
            
                coreConfig.id = makeid(6)
                coreConfig.sheetOrder = []

                updateDocs(id,coreConfig,()=>{
                    const universheet = univerSheetCustom({
                        univerConfig:{
                            id
                        },
                        coreConfig,
                        uiSheetsConfig,
                        baseSheetsConfig,
                        collaborationConfig:{
                            url: `${'ws://'+ipAddress+'/ws/'}${id}`
                        }
                    })

                    insertCopyButton(universheet)
                })
                
            }
            
        })
}
function newDocs(url, params, cb) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then(document => {
        // 处理获取到的文档信息
        console.log(document);
        cb && cb(document)
      })
      .catch(error => {
        console.error(error);
      }); 

  }


  function openDocs(id,cb) {
    // 定义请求参数
        const data = new FormData();
        data.append('id', id);

        // 创建 XMLHttpRequest 对象
        const xhr = new XMLHttpRequest();

        // 监听请求完成事件
        xhr.onload = function() {
        if (xhr.status === 200) {
            const document = JSON.parse(xhr.responseText);
            // 处理获取到的文档信息
            console.log(document);
            cb && cb(document)
        } else {
            console.error(xhr.statusText);
        }
        };

        // 发送 POST 请求
        xhr.open('POST', 'http://'+ipAddress+'/open', true);
        xhr.send(data);

  }
  function updateDocs(id,config,cb) {
    // 定义请求参数
        const data = new FormData();
        data.append('id', id);
        data.append('config', JSON.stringify(config));

        // 创建 XMLHttpRequest 对象
        const xhr = new XMLHttpRequest();

        // 监听请求完成事件
        xhr.onload = function() {
        if (xhr.status === 200) {
            const document = JSON.parse(xhr.responseText);
            // 处理获取到的文档信息
            console.log(document);
            cb && cb(document)
        } else {
            console.error(xhr.statusText);
        }
        };

        // 发送 POST 请求
        xhr.open('POST', 'http://'+ipAddress+'/update', true);
        xhr.send(data);

  }

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
  }
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}