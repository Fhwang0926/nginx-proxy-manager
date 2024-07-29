const migrate_name = 'add_allow_waf';
const logger       = require('../logger').migrate;

/**
 * Migrate
 *
 * @see http://knexjs.org/#Schema
 *
 * @param   {Object} knex
 * @param   {Promise} Promise
 * @returns {Promise}
 */
exports.up = function (knex/*, Promise*/) {
	logger.info('[' + migrate_name + '] Migrating Up...');

	return knex.schema.table('proxy_host', (table) => {
		table.boolean('allow_waf').defaultTo(false).notNullable();
		table.boolean('waf_bot').defaultTo(0).notNullable();
		table.boolean('waf_protocol').defaultTo(0).notNullable();
		table.boolean('waf_application').defaultTo(0).notNullable();
		table.boolean('waf_leak').defaultTo(0).notNullable();
		table.boolean('waf_webshell').defaultTo(0).notNullable();
		table.boolean('waf_blocking').defaultTo(0).notNullable();
		table.boolean('waf_correlation').defaultTo(0).notNullable();
	})
		.then(function () {
			logger.info('[' + migrate_name + '] proxy_host Table altered');
		})
		.then(() => {
			return knex.schema.table('redirection_host', (table) => {
				table.boolean('allow_waf').defaultTo(false).notNullable();
				table.boolean('waf_bot').defaultTo(0).notNullable();
				table.boolean('waf_protocol').defaultTo(0).notNullable();
				table.boolean('waf_application').defaultTo(0).notNullable();
				table.boolean('waf_leak').defaultTo(0).notNullable();
				table.boolean('waf_webshell').defaultTo(0).notNullable();
				table.boolean('waf_blocking').defaultTo(0).notNullable();
				table.boolean('waf_correlation').defaultTo(0).notNullable();
			});
		})
		.then(function () {
			logger.info('[' + migrate_name + '] redirection_host Table altered');
		});
};

/**
 * Undo Migrate
 *
 * @param   {Object} knex
 * @param   {Promise} Promise
 * @returns {Promise}
 */
exports.down = function (knex/*, Promise*/) {
	logger.info('[' + migrate_name + '] Migrating Down...');

	return knex.schema.table('proxy_host', (table) => {
		table.dropColumn('allow_waf');
		table.dropColumn('waf_bot');
		table.dropColumn('waf_protocol');
		table.dropColumn('waf_application');
		table.dropColumn('waf_leak');
		table.dropColumn('waf_webshell');
		table.dropColumn('waf_blocking');
		table.dropColumn('waf_correlation');
	})
		.then(function () {
			logger.info('[' + migrate_name + '] proxy_host Table reverted');
		})
		.then(() => {
			return knex.schema.table('redirection_host', (table) => {
				table.dropColumn('allow_waf');
				table.dropColumn('waf_bot');
				table.dropColumn('waf_protocol');
				table.dropColumn('waf_application');
				table.dropColumn('waf_leak');
				table.dropColumn('waf_webshell');
				table.dropColumn('waf_blocking');
				table.dropColumn('waf_correlation');
			});
		})
		.then(function () {
			logger.info('[' + migrate_name + '] redirection_host Table reverted');
		});
};
