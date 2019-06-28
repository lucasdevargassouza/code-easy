export interface ResourcesTreeInterface {
    'isHaveChild': Boolean;
    'isSelected': Boolean;
    'indexPath': number[];
    'tipoItem': string;
    'staticPropertiesList': StaticPropertiesList[];
    'propertiesList': PropertiesList[];
    'itemList': ResourcesTreeInterface[];
}

interface StaticPropertiesList {
    'propertieName': String;
    'propertiePlaceholder': String;
    'propertieValue': String;
}

interface PropertiesList {
    'propertieName': String;
    'propertieValue': String;
}
