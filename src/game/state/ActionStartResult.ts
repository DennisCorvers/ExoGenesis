import { ActionStoppedReason } from "./ActionStartReason";

export interface IActionStartResult {
    get canStart(): boolean;
    get reason(): ActionStoppedReason | null;
}

export class ActionStartResult implements IActionStartResult {
    private m_canStart: boolean;
    private m_reason: ActionStoppedReason | null;

    get canStart(): boolean {
        return this.m_canStart;
    }
    get reason(): ActionStoppedReason | null {
        return this.m_reason;
    }

    private constructor(canStart: boolean, reason: ActionStoppedReason | null) {
        this.m_canStart = canStart;
        this.m_reason = reason;
    }

    public static success(): ActionStartResult {
        return new ActionStartResult(true, null);
    }

    public static failure(reason: ActionStoppedReason) {
        return new ActionStartResult(false, reason);
    }
}