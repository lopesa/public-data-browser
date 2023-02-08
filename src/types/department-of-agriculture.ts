type DepartmentOfAgricultureDataItem = {
  description: string;
};

export type DepartmentOfAgriculture = {
  dataset: DepartmentOfAgricultureDataItem[];
  // {
  //     "$schema": "http://json-schema.org/draft-04/schema#",
  //     "id": "https://project-open-data.cio.gov/v1.1/schema/catalog.json#",
  //     "title": "Project Open Data Catalog",
  //     "description": "Validates an entire collection of Project Open Data metadata JSON objects. Agencies produce said collections in the form of Data.json files.",
  //     "type": "object",
  //     "dependencies": {
  //       "@type": [
  //         "@context"
  //       ]
  //     },
  //     "required": [
  //       "conformsTo",
  //       "dataset"
  //     ],
  //     "properties": {
  //       "@context": {
  //         "title": "Metadata Context",
  //         "description": "URL or JSON object for the JSON-LD Context that defines the schema used",
  //         "type": "string",
  //         "format": "uri"
  //       },
  //       "@id": {
  //         "title": "Metadata Catalog ID",
  //         "description": "IRI for the JSON-LD Node Identifier of the Catalog. This should be the URL of the data.json file itself.",
  //         "type": "string",
  //         "format": "uri"
  //       },
  //       "@type": {
  //         "title": "Metadata Context",
  //         "description": "IRI for the JSON-LD data type. This should be dcat:Catalog for the Catalog",
  //         "enum": [
  //           "dcat:Catalog"
  //         ]
  //       },
  //       "conformsTo": {
  //         "description": "Version of Schema",
  //         "title": "Version of Schema",
  //         "enum": [
  //           "https://project-open-data.cio.gov/v1.1/schema"
  //         ]
  //       },
  //       "describedBy": {
  //         "description": "URL for the JSON Schema file that defines the schema used",
  //         "title": "Data Dictionary",
  //         "type": "string",
  //         "format": "uri"
  //       },
  //       "dataset": {
  //         "type": "array",
  //         "items": {
  //           "$ref": "dataset.json",
  //           "minItems": 1,
  //           "uniqueItems": true
  //         }
  //       }
  //     }
  //   }
};
