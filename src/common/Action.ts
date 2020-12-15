import {ChangeListeners, Constructor, Observable, Properties} from "tabris";
import {event, inject, Injector} from "tabris-decorators";
import {objectSummary} from ".";
import {AppData} from "../service";

enum DispatcherState {Ready, Busy, Closed}

// Needs to be in the same module, otherwise this
// would cause a difficult to resolve circular dependency
export abstract class ActionDispatcher {

  @inject
  protected appData: AppData;

  @event
  onDispatcherStateChanged: ChangeListeners<ActionDispatcher, 'dispatcherState'>;

  @event
  onCurrentActionChanged: ChangeListeners<ActionDispatcher, 'currentAction'>;

  #currentAction: Action;
  #abort: (ec: Error) => void;
  #state: DispatcherState = DispatcherState.Ready;
  #prefix: string = String(this);

  dispatch<
    SubActionConstructor extends Constructor<Action>,
    SubAction extends Action = InstanceType<SubActionConstructor>
  >(
    actionType: SubActionConstructor,
    param?: Omit<Properties<SubAction>, keyof Action | 'cid'>
  ): SubAction {
    if (this.#currentAction) {
      console.warn(
        this + ' is already executing ' + this.#currentAction + ', ignore '+ actionType.name
      );
      console.trace();
      return;
    }
    if (this.#state !== DispatcherState.Ready) {
      console.warn(this + ' is ' + DispatcherState[this.#state] + ', ignore ' + actionType.name);
      console.trace();
      return;
    }
    const action = this.#currentAction = Injector.get(this).resolve(actionType);
    action.#prefix = this.#prefix + '/' + this.#currentAction.#prefix;
    console.info(action.#prefix, '>>', objectSummary(param || {}));
    try {
      this.#state = DispatcherState.Busy;
      this.onDispatcherStateChanged.trigger({value: this.#state});
      Object.assign(action, param || {});
      action.exec();
      this.#state = DispatcherState.Ready;
    } catch (ex) {
      console.error(this.#currentAction.#prefix, ' << ', ex);
    } finally {
      this.closeAction();
    }
    return action;
  }

  async dispatchAsync<
    SubActionConstructor extends Constructor<AsyncAction>,
    SubAction extends AsyncAction = InstanceType<SubActionConstructor>
  >(
    actionType: SubActionConstructor,
    param?: Omit<Properties<SubAction>, keyof Action | 'cid'>
  ): Promise<SubAction> {
    if (this.#currentAction) {
      console.warn(
        this + ' is already executing ' + this.#currentAction + ', ignore '+ actionType.name
      );
      console.trace();
      return;
    }
    if (this.#state !== DispatcherState.Ready) {
      console.warn(this + ' is ' + DispatcherState[this.#state] + ', ignore ' + actionType.name);
      console.trace();
      return;
    }
    const action = this.#currentAction = Injector.get(this).resolve(actionType);
    action.#prefix = this.#prefix + '/' + this.#currentAction.#prefix;
    console.info(action.#prefix, '>>', objectSummary(param || {}));
    try {
      this.#state = DispatcherState.Busy;
      this.onDispatcherStateChanged.trigger({value: this.#state});
      Object.assign(action, param || {});
      await Promise.race([
        action.exec(),
        new Promise((_, reject) => action.#abort = reject)
      ]);
      action.#abort = null;
      this.#state = DispatcherState.Ready;
    } catch (ex) {
      console.error(this.#currentAction.#prefix, ' << ', ex);
    } finally {
      this.closeAction();
    }
    return action;
  }

  toString() {
    return this.constructor.name;
  }

  get dispatcherState() {
    return this.#state;
  }

  get currentAction() {
    return this.#currentAction;
  }

  [Symbol.observable](): Observable<this> {
    return Observable.mutations(this);
  }

  protected close() {
    if (this.#state === DispatcherState.Closed) {
      return;
    }
    this.closeAction();
    if (this instanceof Action || this instanceof AsyncAction) {
      try {
        this.finally();
      } catch (ex) {
        console.error(ex);
      }
    }
    if (this.#abort) {
      this.#abort(new Error('ABORTED'));
      this.#abort = null;
    } else {
      console.info(this.#prefix, '<< OK');
    }
    this.#state = DispatcherState.Closed;
    this.onDispatcherStateChanged.trigger({value: this.#state})
  }


  private closeAction() {
    if (this.#currentAction) {
      try {
        this.#currentAction.close();
      } catch (ex) {
        console.error(ex);
      }
      this.#currentAction = null;
      this.onCurrentActionChanged.trigger({value: null});
    }
  }

}

export abstract class Action extends ActionDispatcher {

  set(properties: Properties<this>) {
    Object.assign(this, properties);
  }

  init() {
    // set properties, etc
  }

  abstract exec(): void;

  finally(): void {
    // clean up
  }

}

export abstract class AsyncAction extends ActionDispatcher {

  set(properties: Properties<this>) {
    Object.assign(this, properties);
  }

  init() {
    // set properties, etc
  }

  abstract exec(): Promise<void>;

  finally(): void {
    // clean up
  }

}
