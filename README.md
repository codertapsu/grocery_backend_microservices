# Microservices Architecture

When building microservices-based e-commerce applications, we work with the main architecture layers and components as described. Synchronous communication between microservices will be organized via API and asynchronous communication between microservices will be managed via Message Bus.

![Microservices architecture](/images/micro_architecture.png "Microservices architecture")

## User interface layer

Is used to create multiple digital customer touchpoints using the same microservices on the back-end.

## Routing layer

Connects HTTPS queries to corresponding microservices.

- **API gateway** creates APIs at any scale.
- **Service Discovery** finds dynamically assigned network locations of microservices instances.
- **Load Balancer** distributes API calls among microservices.
- **Caching** stores and returns static data (e.g., text files) to upload web pages faster.
- **Security** safeguards microservices from external threats.

## Container ecosystem

Stores units of microservices.

- **Microservices** are built around certain business context: data type, responsibility, function.

## Data storage layer

Each cluster of microservices manages its own data.

---

# Project structure

## User service

Responsible for managing user accounts, authentication, authorization, and user-related data such as user profiles, addresses, and payment methods.

User microservice uses **NATs** as its Transport layer

## Product service

Responsible for managing products, including product catalogs, pricing, and inventory.

Product microservice uses **TCP** as its Transport layer

## Inventory service

Responsible for managing inventory levels, stock availability, and product replenishment.

## Order service

Responsible for managing the order placement, fulfillment, and tracking. This includes order processing, shipment management, and handling order-related data such as order history and order status.

Order microservice uses **Kafka** as its Transport layer

## Payment service

Responsible for processing payments and handling payment-related data such as transactions, refunds, and chargebacks.

Payment microservice uses **REDIS** as its Transport layer

## Delivery service

Responsible for managing the delivery of orders, including scheduling deliveries, tracking shipments, and handling delivery-related data such as delivery history and delivery status.

## Checkout service

Responsible for managing the checkout process, including cart management, shipping options, and payment processing.

## Review service

Responsible for managing product reviews, including posting, managing, and displaying reviews.

## Notification service

Responsible for sending notifications to customers, vendors, and delivery personnel regarding order status, delivery status, and other important information related to the E-commerce system.

## Recommendation service

Responsible for providing product recommendations based on user behavior and preferences.

**Each microservice is designed to be self-contained and independent, with its own database, API, and user interface. This allows for greater scalability, flexibility, and resiliency in the overall system.**

---

# A Brief on microservice communication patterns

Communicating between microservices can happen through a synchronous Request/Response pattern or the asynchronous event/message pattern.

HTTP request and response are the blocking call and are synchronous where an HTTP request waits for the response (either success | failure| or time out) to happen. When it comes to distributed Event Driven Architecture (EDA) the use of HTTP is not advisable. To counter this Asynchronous communication using the pub/sub model comes into play.

Synchronous communication Pattern is supported by TCP whereas Asynchronous communication pattern is supported by Kafka, MQTT, NATS.

Nest Js supports MQTT (lightweight), Kafka (Powerful), RMQ (Rabbit MQ), and Redis (key based) which all are types of Publisher and Subscriber based models.

## Synchronous request/response pattern

is useful where the response/ack is needed before proceeding with the next task. e.g. User Authentication Service which returns the auth token as the response and until we receive the auth token for the requested user id we cannot proceed with the next task that can be performed only by the authenticated user.

```
@MessagePattern() - for synchronous messages style, use send() method
```

## Asynchronous message/event pattern

is useful in the case where the immediate response/ack is not expected and when we are ok with the eventual consistency. It is also worth noting that the eventual consistency does not apply to all the use cases.

```
@EventPattern() - for synchronous messages style, use emit() method
```
