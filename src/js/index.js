import '../css/index.scss';
import Header from '../components/header/index.js';
import { IndexModel } from '../models/index';
import ListItem from '../components/index/list_item/index';

const header = new Header(),
      listItem = new ListItem(),
      indexModel = new IndexModel();

const App = (doc) => {
    const oContainer = doc.getElementsByClassName('J_container')[0],
          oList = oContainer.getElementsByClassName('J_list')[0];

    const init = () => {
        indexModel.getGoodsList(listItem.tpl).then((res) => {
            oList.innerHTML = res;
        });

        // 如果这里不是position：fixed布局的话，header就会在listItem下面了，解决办法就是使用inertBefor将header插入到listItem前面
        oContainer.appendChild(header.tpl('商品列表'));
    }

    init();

}

new App(document);