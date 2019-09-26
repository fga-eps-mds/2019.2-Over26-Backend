const Overdraft = require("../models").Overdraft;
const User = require("../models").User;

module.exports = {
	list(req, res) {
		return Overdraft.findAll()
			.then(overdrafts => res.status(200).send(overdrafts))
			.catch(error => {
				res.status(400).send(error);
			});
	},
	create(req, res) {
		return User.findByPk(req.params.id)
			.then(user => {
				console.log(user.cpf)
				const status = false
				const userCPF = user.cpf
				const limit = 200
				const limitMax = 200
				const limitUsed = 0
				const firstUseDate = null


				return user.createOverdraft({
					userCPF: userCPF,
					status: status,
					limit: limit,
					limitMax: limitMax,
					limitUsed: limitUsed,
					firstUseDate: firstUseDate
				})
					.then(overdraft => res.status(201).send(overdraft))
					.catch(error => res.status(400).send(error));
			})
	},
	getByPk(req, res) {
		return Overdraft.findByPk(req.params.id)
			.then(overdraft => {
				if (!overdraft) {
					return res.status(404).send({
						message: "Overdraft Not Found"
					});
				}
				return res.status(200).send(overdraft);
			})
			.catch(error => res.status(400).send("error"));
	},
	update(req, res) {
		return Overdraft.findByPk(req.params.id)
			.then(overdraft => {
				if (!overdraft) {
					return res.status(404).send({
						message: "Overdraft Not Found"
					});
				}
				return overdraft
					.update({
						status: req.body.status,
						limit: req.body.limit,
						limitMax: req.body.limitMax,
						limitUsed: req.body.limitUsed,
					})
					.then(() => res.status(200).send(overdraft))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	},
	delete(req, res) {
		return Overdraft.findByPk(req.params.id)
			.then(Overdraft => {
				if (!Overdraft) {
					return res.status(400).send({
						message: "Overdraft Not Found"
					});
				}
				return Overdraft
					.destroy()
					.then(() => res.status(204).send())
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	},
	activateCredit(req, res) {
		return Overdraft.findByPk(req.params.id)
			.then(overdraft => {
				if (!overdraft) {
					return res.status(404).send({
						message: "Overdraft Not Found"
					});
				}
				return overdraft
					.update({
						status: true
					})
					.then(() => res.status(200).send(overdraft))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	},

	checkUsability(req, res) {
		return Overdraft.findOne({
			where: {
				userCPF: req.params.cpf
			}
		 })
			.then(overdraft => {
				if (!overdraft) {
					return res.status(404).send({
						message: "Overdraft Not Found"
					});
				}
				if (overdraft.firstUseDate != null) {
					const currentDate = new Date()
					const dateDiff = currentDate.getTime() - overdraft.firstUseDate.getTime()
					const dateDiffDays = dateDiff / 86400000

					if (dateDiffDays > 26) {
						return false
							.then(() => res.status(200).send(false))
							.catch(error => res.status(400).send(error));
					}
					else {
						return true
							.then(() => res.status(200).send(true))
							.catch(error => res.status(400).send(error));
					}
				}
			})

	}
}