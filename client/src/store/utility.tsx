export const updateObject = (oldObject: any, updatedProperties: any) => {
    return {
      ...oldObject,
      ...updatedProperties
    };
};  