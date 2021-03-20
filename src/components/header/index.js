import './index.scss';
import tpl from './index.tpl';//这里通过import导出的tpl是一个方法

export default () => {
    return {
        name: 'header',
        showRemove: false,
        tpl(title, isShow) {
            let oHeader = document.createElement('div');
            oHeader.className = 'header';
            oHeader.innerHTML = tpl().replace(/{{(.*?)}}/g, (node, key) => {
                return {
                    title,
                    is_show: isShow ? 'show' : ''
                }[key];
            });
            return oHeader;
        },

        onEditBtn() {
            this.showRemove = !this.showRemove;
            const oRemoveCell = Array.from(document.getElementsByClassName('remove-cell')),
                  onEditBtn = document.getElementsByClassName('J_editItem')[0];
           
            if(oRemoveCell.length > 0) {
                oRemoveCell.forEach((elem) => {
                    if(this.showRemove) {
                        onEditBtn.innerHTML = '关闭';
                        elem.className += ' show'
                    }else {
                        onEditBtn.innerHTML = '编辑';
                        elem.className = 'cell remove-cell';
                    }
                });
            }else {
                if(this.showRemove) {
                    onEditBtn.innerHTML = '关闭';
                }else {
                    onEditBtn.innerHTML = '编辑';
                }
            }
        }
    }
}