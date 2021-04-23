"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formsend = exports.form = exports.FormData = void 0;
const bdsx_1 = require("bdsx");
const packets_1 = require("bdsx/bds/packets");
const event_1 = require("bdsx/event");
exports.FormData = new Map();
class formJSONTYPE {
}
class formJSON {
    constructor() {
        this.type = "form";
        this.title = "";
        this.content = "";
        this.buttons = [];
    }
}
class CustomformJSON {
    constructor() {
        this.type = "custom_form";
        this.title = "";
        this.content = [];
    }
}
class modalJSON {
    constructor() {
        this.type = "modal";
        this.title = "";
        this.content = "";
        this.button1 = "";
        this.button2 = "";
    }
}
class FormFile {
    constructor() {
        this.json = new formJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    setContent(content) {
        this.json.content = content;
    }
    addButton(text, image) {
        return this.json.buttons.push({
            text: text,
            image: image
        });
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
class CustomFormFile {
    constructor() {
        this.json = new CustomformJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    addContent(content) {
        this.json.content = content;
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
class ModalFile {
    constructor() {
        this.json = new modalJSON();
    }
    setTitle(title) {
        this.json.title = title;
    }
    setContent(content) {
        this.json.content = content;
    }
    setButton1(button) {
        this.json.button1 = button;
    }
    setButton2(button) {
        this.json.button2 = button;
    }
    addhandler(handler) {
        this.handler = handler;
    }
    send() {
        Formsend(this.target, this.json, this.handler);
    }
}
form;
var form;
(function (form_1) {
    form_1.create = {
        form: (target) => {
            let form = new FormFile();
            form.target = target;
            return form;
        },
        custom_form: (target) => {
            let form = new CustomFormFile();
            form.target = target;
            return form;
        },
        modal: (target) => {
            let form = new ModalFile();
            form.target = target;
            return form;
        }
    };
    form_1.write = Formsend;
})(form = exports.form || (exports.form = {}));
/**
  *JsonType example : https://github.com/NLOGPlugins/Form_Json You can use form.write instead of this
*/
function Formsend(target, form, handler, id) {
    try {
        const modalPacket = packets_1.ShowModalFormPacket.create();
        let formId = Math.floor(Math.random() * 1147483647) + 1000000000;
        if (typeof id === "number")
            formId = id;
        modalPacket.setUint32(formId, 0x30);
        modalPacket.setCxxString(JSON.stringify(form), 0x38);
        modalPacket.sendTo(target, 0);
        if (handler === undefined)
            handler = () => { };
        if (!exports.FormData.has(target)) {
            exports.FormData.set(target, [
                {
                    Id: formId,
                    func: handler
                }
            ]);
        }
        else {
            let f = exports.FormData.get(target);
            f.push({
                Id: formId,
                func: handler
            });
            exports.FormData.set(target, f);
        }
        modalPacket.dispose();
    }
    catch (err) { }
}
exports.Formsend = Formsend;
event_1.events.packetRaw(bdsx_1.PacketId.ModalFormResponse).on((ptr, size, target) => {
    ptr.move(1);
    let formId = ptr.readVarUint();
    let formData = ptr.readVarString();
    let dataValue = exports.FormData.get(target).find((v) => v.Id === formId);
    let data = JSON.parse(formData.replace("\n", ""));
    if (dataValue === undefined)
        return;
    dataValue.func(data);
    let f = exports.FormData.get(target);
    f.splice(f.indexOf(dataValue), 1);
    exports.FormData.set(target, f);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQW1EO0FBQ25ELDhDQUF1RDtBQUN2RCxzQ0FBb0M7QUFFekIsUUFBQSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQTBELENBQUM7QUFDeEYsTUFBTSxZQUFZO0NBT2pCO0FBRUQsTUFBTSxRQUFRO0lBQWQ7UUFDSSxTQUFJLEdBQVUsTUFBTSxDQUFDO1FBQ3JCLFVBQUssR0FBVSxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFVLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQStCLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0NBQUE7QUFFRCxNQUFNLGNBQWM7SUFBcEI7UUFDSSxTQUFJLEdBQWlCLGFBQWEsQ0FBQztRQUNuQyxVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLFlBQU8sR0FBUyxFQUFFLENBQUM7SUFDdkIsQ0FBQztDQUFBO0FBRUQsTUFBTSxTQUFTO0lBQWY7UUFDSSxTQUFJLEdBQVcsT0FBTyxDQUFDO1FBQ3ZCLFVBQUssR0FBVSxFQUFFLENBQUM7UUFDbEIsWUFBTyxHQUFVLEVBQUUsQ0FBQztRQUNwQixZQUFPLEdBQVcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBVyxFQUFFLENBQUM7SUFDekIsQ0FBQztDQUFBO0FBRUQsTUFBTSxRQUFRO0lBQWQ7UUFDSSxTQUFJLEdBQWEsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQXNCcEMsQ0FBQztJQW5CRyxRQUFRLENBQUMsS0FBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDNUIsQ0FBQztJQUNELFVBQVUsQ0FBQyxPQUFjO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsU0FBUyxDQUFDLElBQVcsRUFBRSxLQUFhO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxP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