"use strict";

import { APIGatewayEvent, Callback, Context } from "aws-lambda";

import { DatabaseEnum } from "./database/enum/database.enum";
import { EmailWebhookHandler } from "./email-webhook.handler";
import { HandlerResponseDto } from "./dto/handler-response.dto";
import { NotificationPublisherEnum } from "./publisher/enum/notification-publisher.enum";
import { ProviderEnum } from "./providers/enum/provider.enum";


async function webhookHandler(
    event: APIGatewayEvent,
    context: Context,
    callback: Callback,
): Promise<HandlerResponseDto> {
    const handler = new EmailWebhookHandler(JSON.parse(event.body), {
        provider: ProviderEnum.MAILGUN,
        database: DatabaseEnum.DYNAMO_DB,
        notificationPublisher: NotificationPublisherEnum.SNS,
    });

    let response: HandlerResponseDto;
    try {
        const ret = await handler.handle();
        response = {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
            body: JSON.stringify({
                success: ret,
            }),
        };
    } catch (err) {
        response = {
            statusCode: 419,
            headers: {
                "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            },
            body: JSON.stringify({
                error: err,
            }),
        };
    }
    callback(null, response);
    return response;
}

module.exports.emailWebhook = webhookHandler;
