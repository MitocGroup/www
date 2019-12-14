# title
My Architecture: Apache Kafka by Confluent on AWS Cloud

# description
Recent engagement with $4.5B customer produced very positive outcome with very surprising learning lesson: we had to create reference architecture for Apache Kafka by Confluent on AWS cloud from scratch because there wasn't any available.

# image
https://www.mitocgroup.com/images/blog/2019-08-04/kafka-arch.png

# publicationDate
Sun, 4 August 2019 12:20:55 -0400

---

In this short article we would like to share what we were able to achieve in a very short period of time. Our intention is to help others if they come across something similar. Unfortunately, we can't give proper credits to everybody who made this reference architecture possible. Nevertheless, when the time comes, we'll gladly update this article with well deserved recognition.

<div class="padd25px">
    <img src="/images/blog/2019-08-04/kafka-arch.png" alt="partner aws" />
    <div class="center img-description">My Architecture: Apache Kafka by Confluent on AWS Cloud</div>
</div>

In a nutshell, Apache Kafka by Confluent was required to run in a multi-region setup (to be precise: North Virginia and Oregon). Each region was using 3 availability zones for HA and Low Latency. Kafka nodes require sub 10ms latency, therefore different clusters were deployed in each region and messages are being transferred from one region into another using Replicator nodes (to be precise: Replicator processes are running on Connector nodes).

Each Kafka cluster includes:

- 5 Brokers nodes
- 5 Zookeeper nodes
- 2 Connector nodes (+2 Replicator processes)
- 2 Schema Registry nodes
- 2 REST API nodes
- 2 KSQL nodes
- 2 KStream nodes
- 1 Control Center node

Traffic between customer datacenters and AWS regions, as well as from one AWS region into another AWS region, is managed through Transit Gateway. At the time of writing, latency between North Virginia and Oregon was around 70–80 ms (according to [cloudping.co](https://www.cloudping.co/)).

Share your thoughts and your experience on [LinkedIn](https://linkedin.com/company/mitoc-group), [Twitter](https://twitter.com/mitocgroup), [Facebook](https://facebook.com/mitocgroup) or in the comments section below.
