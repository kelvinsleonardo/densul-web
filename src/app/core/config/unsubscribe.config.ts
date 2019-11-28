/* tslint:disable */
function isFunction(fn) {
    return typeof fn === 'function';
}

export function AutoUnsubscribe({blackList = []} = {}) {

    return function (constructor: Function) {
        const original = constructor.prototype.ngOnDestroy;

        if (!isFunction(original) && !window['disableAuthUnsubscribeAot']) {
            console.warn(`${constructor.name} is using @AutoUnsubscribe but does not implement OnDestroy`);
        }

        constructor.prototype.ngOnDestroy = function () {
            for (const prop in this) {
                if (this.hasOwnProperty(prop)) {
                    const property = this[prop];
                    blackList.indexOf(prop) === -1 && property && isFunction(property.unsubscribe) && property.unsubscribe();
                }
            }
            isFunction(original) && original.apply(this, arguments);
        };
    };

}

/*

 Using in component
 @AutoUnsubscribe

 Using in component with exceptions
 @AutoUnsubscribe(["one$", "two$"])

  Source: https://netbasal.com/automagically-unsubscribe-in-angular-4487e9853a88

 */
