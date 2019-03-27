import { InputField, InputFieldProps } from "src/widget/form/input-field";
import logger, { LogLevels } from "hornet-js-utils/src/logger/dec-logger";

export class TestableInputField<P extends InputFieldProps, S> extends InputField<P, S> {
    @logger({
        level: LogLevels.INFO,
        message: {
            template: "Log applicative INFO : ${props.id} ${props.name}"}})
    renderWidget(): JSX.Element {
        this.renderWidgetForFatal();
        this.renderWidgetForError();
        this.renderWidgetForWarn();
        this.renderWidgetForDebug();
        this.renderWidgetForTrace();
        return super.renderWidget();
    }

    @logger({
        level: LogLevels.FATAL,
        message: {
            template: "Log applicative FATAL : ${props.id} ${props.name}"}})
    renderWidgetForFatal(): JSX.Element {
        return null;
    }

    @logger({
        level: LogLevels.ERROR,
        message: {
            template: "Log applicative ERROR : ${props.id} ${props.name}"}})
    renderWidgetForError(): JSX.Element {
        return null;
    }

    @logger({
        level: LogLevels.WARN,
        message: {
            template: "Log applicative WARN : ${props.id} ${props.name}"}})
    renderWidgetForWarn(): JSX.Element {
        return null;
    }

    @logger({
        level: LogLevels.DEBUG,
        message: {
            template: "Log applicative DEBUG : ${props.id} ${props.name}"}})
    renderWidgetForDebug(): JSX.Element {
        return null;
    }

    @logger({
        level: LogLevels.TRACE,
        message: {
            template: "Log applicative TRACE : ${props.id} ${props.name}"}})
    renderWidgetForTrace(): JSX.Element {
        return null;
    }
}
