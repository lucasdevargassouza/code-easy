export interface ResourcesTreeInterface {
    'isHaveChild': Boolean;
    'isSelected': Boolean;
    'indexPath': number[];
    'tipoItem': string;
    'staticPropertiesList': StaticProperties[];
    'propertiesList': Properties[];
    'itemList': ResourcesTreeInterface[];
}

interface StaticProperties {
    'propertieName': string;
    'propertieType': string;
    'propertieSugestions': Sugestions[];
    'propertiePlaceholder': string;
    'propertieValue': string;
}

interface Properties {
    'propertieName': string;
    'propertieType': string;
    'propertieSugestions': Sugestions[];
    'propertieValue': string;
}

interface Sugestions {
    'sugestionsName': string;
    'sugestionsValue': string;
}
