const objectValue = script.Parent?.FindFirstChildOfClass("ObjectValue");
if (!objectValue) throw "Expected ObjectValue!";

const target = objectValue.Value;
if (!target || !target.IsA("ModuleScript")) throw "Expected ObjectValue.Value to be a ModuleScript!";

const bindableEvent = script.Parent?.FindFirstChildOfClass("BindableEvent");
if (!bindableEvent) throw "Expected BindableEvent!";

const callback = require(target) as Callback;

bindableEvent.Event.ConnectParallel((...args: Array<unknown>) => callback(...args));
