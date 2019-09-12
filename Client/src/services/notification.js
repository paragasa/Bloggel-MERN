import Noty from 'noty';

export default class NotificationsService{
    success(message){
        (new Noty({
            text:message,
            type:'success',
            timeout: 3500,
            theme: 'sunset',
            
        })).show();
    }
    error(message){
        (new Noty({
            text:message,
            type:'error',
            timeout: 3500,
            theme: 'sunset',

        })).show()
    }
    alert(message){
        (new Noty({
            text:message,
            type:'alert',
            timeout: 3500,
            theme: 'sunset',

        })).show()
    }

}