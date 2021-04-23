import { NetworkIdentifier, PacketId } from "bdsx";
import { ShowModalFormPacket } from "bdsx/bds/packets";
import { events } from "bdsx/event";

export let FormData = new Map<NetworkIdentifier, {Id:number;func:(data:any)=>void}[]>();
class formJSONTYPE {
    type:"form"|"custom_form"|"modal";
    title:string;
    content:string|any[];
    buttons?:{text:string; image?:any}[];
    button1?:string;
    button2?:string;
}

class formJSON {
    type:"form" = "form";
    title:string = "";
    content:string = "";
    buttons:{text:string; image?:any}[] = [];
}

class CustomformJSON {
    type:"custom_form" = "custom_form";
    title:string = "";
    content:any[] = [];
}

class modalJSON {
    type:"modal" = "modal";
    title:string = "";
    content:string = "";
    button1?:string = "";
    button2?:string = "";
}

class FormFile {
    json: formJSON = new formJSON();
    handler?: (data: any) => void;
    target: NetworkIdentifier;
    setTitle(title:string) {
        this.json.title = title;
    }
    setContent(content:string) {
        this.json.content = content;
    }
    addButton(text:string, image?:object) {
        return this.json.buttons.push({
            text: text,
            image: image
        });
    }
    addhandler(handler?:(data:number)=>void){
        this.handler = handler;
    }
    send(){
        Formsend(this.target, this.json, this.handler);
    }

}
class CustomFormFile {
    json: CustomformJSON = new CustomformJSON();
    handler?: (data: any) => void;
    target: NetworkIdentifier;
    setTitle(title:string) {
        this.json.title = title;
    }
    addContent(content:object[]) {
        this.json.content = content;
    }
    addhandler(handler?:(data:any)=>void){
        this.handler = handler;
    }
    send(){
        Formsend(this.target, this.json, this.handler);
    }

}

class ModalFile {
    json: modalJSON = new modalJSON();
    handler?: (data: any) => void;
    target: NetworkIdentifier;
    setTitle(title:string) {
        this.json.title = title;
    }
    setContent(content:string) {
        this.json.content = content;
    }
    setButton1(button:string) {
        this.json.button1 = button;
    }
    setButton2(button:string) {
        this.json.button2 = button;
    }
    addhandler(handler?:(data:boolean)=>void){
        this.handler = handler;
    }
    send(){
        Formsend(this.target, this.json, this.handler);
    }

}

form


export namespace form {
    export const create = {
        form:(target: NetworkIdentifier): FormFile => {
            let form = new FormFile();
            form.target = target;
            return form;
        },
        custom_form:(target: NetworkIdentifier): CustomFormFile => {
            let form = new CustomFormFile();
            form.target = target;
            return form;
        },
        modal:(target: NetworkIdentifier): ModalFile => {
            let form = new ModalFile();
            form.target = target;
            return form;
        }

    }

    export const write = Formsend;
}

/**
  *JsonType example : https://github.com/NLOGPlugins/Form_Json You can use form.write instead of this
*/
export function Formsend(target: NetworkIdentifier, form: formJSONTYPE|object, handler?: (data: any) => void, id?:number) {
    try {
        const modalPacket = ShowModalFormPacket.create();
        let formId = Math.floor(Math.random() * 1147483647) + 1000000000;
        if (typeof id === "number") formId = id;
        modalPacket.setUint32(formId, 0x30);
        modalPacket.setCxxString(JSON.stringify(form), 0x38);
        modalPacket.sendTo(target, 0);
        if (handler === undefined) handler = ()=>{}
        if (!FormData.has(target)) {
            FormData.set(target, [
                {
                    Id: formId,
                    func: handler
                }
            ])
        } else {
            let f = FormData.get(target)!;
            f.push({
                Id: formId,
                func: handler
            })
            FormData.set(target, f);
        }
        modalPacket.dispose();
    } catch (err) {}
}
events.packetRaw(PacketId.ModalFormResponse).on((ptr, size, target) => {
    ptr.move(1);
    let formId = ptr.readVarUint();
    let formData = ptr.readVarString();
    let dataValue = FormData.get(target)!.find((v)=> v.Id === formId)!;
    let data = JSON.parse(formData.replace("\n",""));
    if (dataValue === undefined) return;
    dataValue.func(data);
    let f = FormData.get(target)!;
    f.splice(f.indexOf(dataValue), 1);
    FormData.set(target, f);
});