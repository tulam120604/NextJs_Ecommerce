import { create_attribute } from "./create";
import { get_attribute_catalog } from "./get";
import { remove_attribute_catalog } from "./remove";
import { update_attribute_catalog } from "./update";

const Attribute = {
    get_attribute_catalog,
    create_attribute,
    remove_attribute_catalog,
    update_attribute_catalog
};


export default Attribute