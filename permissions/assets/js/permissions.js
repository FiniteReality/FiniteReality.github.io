"use strict";

// behold, my beautiful code.
// also: behold the field where my fucks are grown, and thy shall see that it is barren.

angular.module('permissionsCalc', [])
	.controller('calc', ['$scope', '$location', function($scope, $location) {
		let perms = parseInt($location.hash());

		$scope.calculatePermissions = function()
		{
			let value = 0;
			for (let sectionId in $scope.permissions)
			{
				let section = $scope.permissions[sectionId];
				for (let permissionId in section.permissions)
				{
					let permission = section.permissions[permissionId];
					if (permission.active)
					{
						value |= permission.value;
					}
				}
			}
			$location.hash(value);
			return value;
		}
		$scope.calculateExplanation = function()
		{
			let resultSects = [ ];
			for (let sectionId in $scope.permissions)
			{
				let section = $scope.permissions[sectionId];
				for (let permissionId in section.permissions)
				{
					let permission = section.permissions[permissionId];
					if (permission.active)
					{
						resultSects.push("0x"+permission.value.toString(16));
					}
				}
			}
			if (resultSects.length == 0) { resultSects.push("0x0"); }
			return resultSects.join(" | ");
		}

		$scope.permissions = [
			{
				name: "General",
				permissions: [
					{active: false, id: "administrator",    name: "Administrator",         value: 0x8},
					{active: false, id: "manage_roles",     name: "Manage roles",          value: 0x10000000},
					{active: false, id: "kick_members",     name: "Kick members",          value: 0x2},
					{active: false, id: "instant_invite",   name: "Create Instant Invite", value: 0x1},
					{active: false, id: "manage_nicknames", name: "Manage Nicknames",      value: 0x8000000},
					{active: false, id: "manage_server",    name: "Manage Server",         value: 0x20},
					{active: false, id: "manage_channels",  name: "Manage Channels",       value: 0x10},
					{active: false, id: "ban_members",      name: "Ban Members",           value: 0x4},
					{active: false, id: "change_nickname",  name: "Change Nickname",       value: 0x4000000},
				]
			},
			{
				name: "Text",
				permissions: [
					{active: false, id: "read_messages",        name: "Read Messages",        value: 0x400},
					{active: false, id: "send_tts_messages",    name: "Send TTS Messages",    value: 0x1000},
					{active: false, id: "embed_links",          name: "Embed links",          value: 0x4000},
					{active: false, id: "read_message_history", name: "Read Message History", value: 0x10000},
					{active: false, id: "use_external_emojis",  name: "Use External Emojis",  value: 0x40000},
					{active: false, id: "send_messages",        name: "Send Messages",        value: 0x800},
					{active: false, id: "manage_messaes",       name: "Manage Messages",      value: 0x2000},
					{active: false, id: "attach_files",         name: "Attach files",         value: 0x8000},
					{active: false, id: "mention_everyone",     name: "Mention Everyone",     value: 0x20000}
				]
			},
			{
				name: "Voice",
				permissions: [
					{active: false, id: "connect",            name: "Connect",            value: 0x100000},
					{active: false, id: "mute_members",       name: "Mute Members",       value: 0x400000},
					{active: false, id: "move_members",       name: "Move Members",       value: 0x1000000},
					{active: false, id: "speak",              name: "Speak",              value: 0x200000},
					{active: false, id: "deafen_members",     name: "Deafen Members",     value: 0x800000},
					{active: false, id: "use_voice_activity", name: "Use Voice Activity", value: 0x2000000}
				]
			}
		];

		if (!isNaN(perms))
		{
			for (let sectionId in $scope.permissions)
			{
				let section = $scope.permissions[sectionId];
				for (let permissionId in section.permissions)
				{
					let permission = section.permissions[permissionId];
					permission.active = (perms & permission.value) != 0;
				}
			}
		}
	}]);