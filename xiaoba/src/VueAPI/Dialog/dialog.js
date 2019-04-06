import { MessageBox } from 'element-ui';

export function warn(content, title){
MessageBox.alert(content, title, {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
   
        }
      });
    }
