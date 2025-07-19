export default function Serverble(Savable){
    return class Serverble extends Savable {}
}

// or just
import SavableThing from '../Savable/Savable.js';
SavableThing.prototype.assign({
    save(){} // override a few methods
});