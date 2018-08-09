import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import * as React from "react";
import { HornetComponent } from "hornet-js-react-components/src/widget/component/hornet-component";
import * as moment from "moment-timezone";
import { HornetComponentProps, HornetComponentState } from "hornet-js-components/src/component/ihornet-component";

(moment.duration as any).fn.format = function(){
    let str = "";
    if(this.days() > 1) str = str + Math.floor(this.days()) + "d ";
    if(this.hours() > 1) str = str + Math.floor(this.hours()) + "h ";
    if(this.minutes() > 1) str = str + Math.floor(this.minutes()) + "m ";
    if(this.seconds() > 1) str = str + Math.floor(this.seconds()) + "s ";
    return str
};

/**
 * Déclaration des prpriétés du CountDown
 */
export interface CountDownProps extends HornetComponentProps {
    secondsRemaining: number;
    countDownExpiredMesage?: string,
    countDownNormalMessage?: string
}

/**
 *
 */
export class Countdown extends HornetComponent<CountDownProps, any> {

    protected interval;

    static defaultProps = {
        countDownExpiredMesage: "notificationSession.countDownExpiredMesage",
        countDownNormalMessage: "notificationSession.countDownNormalMessage"
    };

    constructor(props, context?: any) {
        super(props, context);

        this.state = {
            ...this.state,
            secondsRemaining: 0
        };
    }

    componentDidMount() {
        this.setState({secondsRemaining: this.props.secondsRemaining});
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
     * Génère le rendu spécifique du champ
     * @returns {any}
     * @override
     */
    render(): JSX.Element {

        let message:any = this.i18n(this.props.countDownExpiredMesage);
        if(this.state.secondsRemaining != 0) {

            // let s = Math.floor(this.state.secondsRemaining / 1000) % 60;
            // //minutes
            // let m = Math.floor(this.state.secondsRemaining / 60000) % 60;
            //
            // //affichage
            // let time = m + ":" + s;
            let time = (moment.duration(this.state.secondsRemaining, "milliseconds") as any).format("H:mm:ss");
            message = this.i18n(this.props.countDownNormalMessage) + time
        }

        return (
            message
        );
    }

    /**
     *
     */
    tick(): void {
        this.setState({secondsRemaining: this.state.secondsRemaining - 1000});
        if (this.state.secondsRemaining <= 0) {
            clearInterval(this.interval);
        }
    }
}