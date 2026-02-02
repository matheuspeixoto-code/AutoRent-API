import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealIMailProvider } from "./MailProvider/implementations/EtherealIMailProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)


container.registerInstance<IMailProvider>(
    "EtherealIMailProvider",
    new EtherealIMailProvider()
)